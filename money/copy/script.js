document.getElementById('calculator').addEventListener('input', function() {
  var note1000 = document.getElementById('note1000').value * 1000;
  var coin500 = document.getElementById('coin500').value * 500;
  var coin100 = document.getElementById('coin100').value * 100;
  var coin50 = document.getElementById('coin50').value * 50;
  var coin10 = document.getElementById('coin10').value * 10;
  var coin5 = document.getElementById('coin5').value * 5;

  var total = note1000 + coin500 + coin100 + coin50 + coin10 + coin5;
  
  document.getElementById('result').textContent = '計算結果: ' + total + '円';
});