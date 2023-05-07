// キャンバスの作成と初期設定
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

canvas.id = 'background-canvas';
document.body.appendChild(canvas);


// 図形の設定
var shapes = [];
var numShapes = window.innerWidth > 600 ? 400 : 100; // スマートフォンでは100個に減らす
var size = 4;
for (var i = 0; i < numShapes; i++) {
  var shape = {};
  shape.x = Math.random() * canvas.width;
  shape.y = Math.random() * canvas.height;
  shape.color = "#0077c2";
  shape.vx = Math.random() * 2 - 1;
  shape.vy = Math.random() * 2 - 1;
  shape.connections = [];
  shapes.push(shape);
}


// 描画関数
function drawBackground() {

  // 背景のクリア
  ctx.fillStyle = "#222222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 図形の描画
  for (var i = 0; i < numShapes; i++) {
    ctx.fillStyle = shapes[i].color;
    ctx.beginPath();
    ctx.arc(shapes[i].x, shapes[i].y, size, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();

    // 線を引く
    for (var j = i + 1; j < numShapes; j++) {
      var dx = shapes[i].x - shapes[j].x;
      var dy = shapes[i].y - shapes[j].y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = "#00bfff";
        ctx.globalAlpha = 1 - dist / 100;
        ctx.beginPath();
        ctx.moveTo(shapes[i].x, shapes[i].y);
        ctx.lineTo(shapes[j].x, shapes[j].y);
        ctx.stroke();
        // 重複を避ける
        if (!shapes[i].connections.includes(j)) {
          shapes[i].connections.push(j);
        }
        if (!shapes[j].connections.includes(i)) {
          shapes[j].connections.push(i);
        }
      } else {
        // 重複を解除する
        if (shapes[i].connections.includes(j)) {
          shapes[i].connections.splice(shapes[i].connections.indexOf(j), 1);
        }
        if (shapes[j].connections.includes(i)) {
          shapes[j].connections.splice(shapes[j].connections.indexOf(i), 1);
        }
      }
    }

    // 壁に当たった時の反射
    if (shapes[i].x + size > canvas.width || shapes[i].x - size < 0) {
      shapes[i].vx = -shapes[i].vx;
    }
    if (shapes[i].y + size > canvas.height || shapes[i].y - size < 0) {
      shapes[i].vy = -shapes[i].vy;
    }
    // 図形の移動
    shapes[i].x += shapes[i].vx;
    shapes[i].y += shapes[i].vy;
  }

  // 線の透明度を元に戻す
  ctx.globalAlpha = 1;

  // アニメーションフレームを再度要求
  requestAnimationFrame(drawBackground);
}

// キャンバスのリサイズ処理
function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (var i = 0; i < numShapes; i++) {
    shapes[i].x = Math.random() * canvas.width;
    shapes[i].y = Math.random() * canvas.height;
  }
}


// ページの読み込み完了時の処理
window.onload = function () {
  // キャンバスのリサイズ処理を呼び出し
  onResize();
  // リサイズイベントの登録
  window.addEventListener('resize', onResize);
};
// 描画関数を呼び出し
drawBackground();