const numSidesInput = document.getElementById("num_sides");
const numDiceInput = document.getElementById("num_dice");
const rollButton = document.getElementById("roll_button");
const waitTimeMinutesInput = document.getElementById("wait_time_minutes");
const waitTimeSecondsInput = document.getElementById("wait_time_seconds");
const countdownStartButton = document.getElementById("countdown_start_button");
const countdownElement = document.getElementById("countdown");
const resultElement = document.getElementById("result");

rollButton.addEventListener("click", rollDice);
countdownStartButton.addEventListener("click", startCountdown);

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
        } else {
          countdownElement.textContent = "次の振りまで: " + formatTime(remainingTime);
        }
      }, 1000);
    }
  }