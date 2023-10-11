let deck = [];
let playerHand = [];
let dealerHand = [];
let isGameOver = false;  // Add this line

function startGame() {
  // Create a deck of cards
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  // Shuffle the deck
  deck.sort(() => Math.random() - 0.5);
  // Deal the initial hands
  playerHand.push(deck.pop(), deck.pop());
  dealerHand.push(deck.pop(), deck.pop());
  checkForBlackjack();
  renderGame();
}

function checkForBlackjack() {
  const playerScore = calculateScore(playerHand);
  if (playerScore === 21) {
    isGameOver = true;  // Set game over flag to true
    setTimeout(() => {
      showModal('Blackjack! You win!');
      //revealDealerHand();
      updateScoreboard();  // Update the scoreboard to show dealer's final score
      resetGame();
    }, 1000);
  }
}

function hit() {
  console.log('Before hit:', { playerHand, dealerHand, deck });  // Log the state before hit
  playerHand.push(deck.pop());
  renderGame();
  checkForBlackjack();
  checkForBust();
  console.log('After hit:', { playerHand, dealerHand, deck });  // Log the state after hit
}

async function stand() {
  await revealDealerHand();  // Wait for dealer's hand to be revealed
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    renderGame();
    await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for 1 second
  }
  checkForWinner();
}

function checkForWinner() {
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);
  if ((playerScore === 21 && playerHand.length === 2) || playerScore > dealerScore || dealerScore > 21) {
    setTimeout(() => {
      showModal('You win!');
      resetGame();
    }, 1000);
  } else if (playerScore < dealerScore) {
    setTimeout(() => {
      showModal('You lose!');
      resetGame();
    }, 1000);
  } else {
    setTimeout(() => {
      showModal('It\'s a draw!');
      resetGame();
    }, 1000);
  }
}


async function revealDealerHand() {
  isGameOver = true;  // Set the game over flag to true here
  const dealerHandDiv = document.getElementById('dealer-hand');

  // Remove the face-down card
  dealerHandDiv.removeChild(dealerHandDiv.childNodes[1]);

  // Reveal the face-down card
  const cardImage = getCardImage(dealerHand[1]);
  dealerHandDiv.innerHTML += `<div class="card" style="background-image: url('${cardImage}');"></div>`;
  await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for 1 second

  // Continue to reveal the rest of the dealer's hand
  for (let i = 2; i < dealerHand.length; i++) {
    const cardImage = getCardImage(dealerHand[i]);
    dealerHandDiv.innerHTML += `<div class="card" style="background-image: url('${cardImage}');"></div>`;
    await new Promise(resolve => setTimeout(resolve, 1000));  // Wait for 1 second
  }

  updateScoreboard();  // Update the scoreboard to show dealer's final score
}


function updateScoreboard() {
  const scoreboardDiv = document.getElementById('scoreboard');
  const playerScore = calculateScore(playerHand);
  let dealerScoreText;
  if (isGameOver) {
    dealerScoreText = calculateScore(dealerHand).toString();
  } else {
    const openCardValue = getCardValue(dealerHand[0]);
    dealerScoreText = `${openCardValue} + ?`;
  }
  scoreboardDiv.innerHTML = `Player: ${playerScore} - Dealer: ${dealerScoreText}`;
}

function getCardValue(card) {
  if (card.value === 'A') {
    return 11;
  } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
    return 10;
  } else {
    return parseInt(card.value);
  }
}

function checkForBust() {
  const playerScore = calculateScore(playerHand);
  if (playerScore > 21) {
    setTimeout(() => {
      showModal('Bust! You lose.');
      revealDealerHand();
      resetGame();
    }, 1000);  // Delay to allow player to see final card before showModal
  }
}

function resetGame() {
  deck = [];
  playerHand = [];
  dealerHand = [];
  isGameOver = false;  // Reset the game over flag here
  document.getElementById('dealer-hand').innerHTML = '';  // Clear dealer hand display
  startGame();
}

function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;
  for (let card of hand) {
    if (card.value === 'A') {
      aceCount++;
      score += 11;
    } else if (card.value === 'K' || card.value === 'Q' || card.value === 'J') {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }
  return score;
}

function getCardImage(card) {
  const suitInitial = card.suit.charAt(0).toLowerCase();
  let value;
  switch (card.value) {
    case 'A':
      value = '01';
      break;
    case 'K':
      value = '13';
      break;
    case 'Q':
      value = '12';
      break;
    case 'J':
      value = '11';
      break;
    default:
      value = card.value.padStart(2, '0');
  }
  return `src/trump/${suitInitial}${value}.png`;
}

function renderGame() {
  const playerHandDiv = document.getElementById('player-hand');
  const dealerHandDiv = document.getElementById('dealer-hand');
  const scoreboardDiv = document.getElementById('scoreboard');

  playerHandDiv.innerHTML = '';
  dealerHandDiv.innerHTML = '';
  for (let card of playerHand) {
    const cardImage = getCardImage(card);
    playerHandDiv.innerHTML += `<div class="card" style="background-image: url('${cardImage}');"></div>`;
  }

  for (let i = 0; i < dealerHand.length; i++) {
    let cardImage;
    if (i === 1 && dealerHand.length === 2 && !isGameOver) {
      cardImage = 'src/trump/bk0.png';
    } else {
      cardImage = getCardImage(dealerHand[i]);
    }
    dealerHandDiv.innerHTML += `<div class="card" style="background-image: url('${cardImage}');"></div>`;
  }

  const playerScore = calculateScore(playerHand);
  const dealerScore = dealerHand.length === 2 && !isGameOver ? '?' : calculateScore(dealerHand);
  scoreboardDiv.innerHTML = `Player: ${playerScore} - Dealer: ${dealerScore}`;
  updateScoreboard();
}

function showModal(message) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalMessage = document.getElementById('modal-message');
  const modalClose = document.getElementById('modal-close');

  modalMessage.textContent = message;
  modalOverlay.classList.remove('hidden');

  modalClose.addEventListener('click', function() {
      modalOverlay.classList.add('hidden');
  });
}

startGame();