const numSidesInput = document.getElementById("num_sides");
const numDiceInput = document.getElementById("num_dice");
const rollButton = document.getElementById("roll_button");
const waitTimeMinutesInput = document.getElementById("wait_time_minutes");
const waitTimeSecondsInput = document.getElementById("wait_time_seconds");
const countdownStartButton = document.getElementById("countdown_start_button");
const countdownElement = document.getElementById("countdown");
const resultElement = document.getElementById("result");

const alertSound = new Audio("alert.mp3");

rollButton.addEventListener("click", rollDice);
countdownStartButton.addEventListener("click", startCountdown);


function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  return {
    numSides: queryParams.get("numSides"),
    numDice: queryParams.get("numDice"),
  };
}

const queryParams = getQueryParams();
if (queryParams.numSides) {
  numSidesInput.value = queryParams.numSides;
}
if (queryParams.numDice) {
  numDiceInput.value = queryParams.numDice;
}


function rollDice() {
  const numSides = parseInt(numSidesInput.value);
  const numDice = parseInt(numDiceInput.value);
  const rolls = [];

  for (let i = 0; i < numDice; i++) {
    rolls.push(Math.floor(Math.random() * numSides) + 1);
  }

  resultElement.textContent = "結果: " + rolls.join(", ");

  const waitTimeMinutes = parseInt(waitTimeMinutesInput.value) || 0;
  const waitTimeSeconds = parseInt(waitTimeSecondsInput.value) || 0;
  const waitTimeTotal = waitTimeMinutes * 60 + waitTimeSeconds;

  if (waitTimeTotal > 0) {
    let remainingTime = waitTimeTotal;
    countdownElement.textContent = "次の振りまで: " + formatTime(remainingTime);
    const countdownInterval = setInterval(() => {
      remainingTime--;
      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "";
      } else {
        countdownElement.textContent = "次の振りまで: " + formatTime(remainingTime);
      }
    }, 1000);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}分${remainingSeconds}秒`;
}

function startCountdown() {
  const waitTimeMinutes = parseInt(waitTimeMinutesInput.value) || 0;
  const waitTimeSeconds = parseInt(waitTimeSecondsInput.value) || 0;
  const waitTimeTotal = waitTimeMinutes * 60 + waitTimeSeconds;

  if (waitTimeTotal > 0) {
    let remainingTime = waitTimeTotal;
    countdownElement.textContent = "次の振りまで: " + formatTime(remainingTime);
    const countdownInterval = setInterval(() => {
      remainingTime--;
      if (remainingTime === 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "";
        alertSound.play();
      } else {
        countdownElement.textContent = "次の振りまで: " + formatTime(remainingTime);
      }
    }, 1000);
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Dice/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
window.tweetResults = function() {
  const numDice = document.getElementById("num_dice").value;
  const numSides = document.getElementById("num_sides").value;
  const results = document.getElementById("result").textContent;

  const baseUrl = "https://git.xn--nck3b1a.com/Dice/";
  const queryParams = `?dice=${numDice}&sides=${numSides}`;
  const appUrl = baseUrl + queryParams;

  const tweetText = `サイコロの結果: ${results}\nインターバルダイスで振りました！\n面数: ${numSides} 個数: ${numDice}\n${appUrl}`;
  const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
  window.open(url, "_blank");
}
