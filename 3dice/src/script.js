document.getElementById('rollButton').addEventListener('click', function() {
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;
  var dice3 = Math.floor(Math.random() * 6) + 1;

  var result = '出た目: ' + dice1 + ', ' + dice2 + ', ' + dice3;
  var yaku = calculateYaku(dice1, dice2, dice3);

  document.getElementById('diceResult').textContent = result + ' - ' + yaku;
});

function calculateYaku(d1, d2, d3) {
  if (d1 === d2 && d2 === d3) {
      return 'ピンゾロ（三つ目同数）';
  } else if (d1 + d2 + d3 === 10) {
      return 'シゴロ（合計10）';
  } else if (d1 + d2 + d3 === 5) {
      return 'ヒフミ（合計5）';
  } else {
      return 'ノーロール';
  }
}
