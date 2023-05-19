document.getElementById('calculator').addEventListener('input', function() {
  var note10000 = document.getElementById('note10000').value * 10000;
  var note5000 = document.getElementById('note5000').value * 5000;
  var note1000 = document.getElementById('note1000').value * 1000;
  var coin500 = document.getElementById('coin500').value * 500;
  var coin100 = document.getElementById('coin100').value * 100 * 50;
  var coin50 = document.getElementById('coin50').value * 50 * 50;
  var coin10 = document.getElementById('coin10').value * 10 * 50;
  var coin5 = document.getElementById('coin5').value * 5 * 50;
  var coin1 = document.getElementById('coin1').value * 1 * 50;
  var extraCoins = document.getElementById('extraCoins').value * 1;

  var target = document.getElementById('target').value;
  
  var total = note10000 + note5000 + note1000 + coin500 + coin100 + coin50 + coin10 + coin5 + coin1 + extraCoins;
  
  var resultDiv = document.getElementById('result');
  if (total === target) {
      resultDiv.textContent = '計算結果: ' + total + '円 (正確に一致)';
      resultDiv.className = 'exact';
  } else {
      resultDiv.textContent = '計算結果: ' + total + '円 (目標から' + (target - total) + '円差)';
      resultDiv.className = 'off';
  }
});
