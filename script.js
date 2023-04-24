// キャンバスの初期設定
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 図形の設定
var shapes = [];
var numShapes = 200;
var size = 10;
for (var i = 0; i < numShapes; i++) {
  var shape = {};
  shape.x = Math.random() * canvas.width;
  shape.y = Math.random() * canvas.height;
  shape.color = "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", 0.5)";
  shape.vx = Math.random() * 2 - 1;
  shape.vy = Math.random() * 2 - 1;
  shapes.push(shape);
}

// 描画関数
function draw() {
  // 背景のクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        ctx.strokeStyle = "rgba(255, 255, 255, " + (1 - dist / 100) + ")";
        ctx.beginPath();
        ctx.moveTo(shapes[i].x, shapes[i].y);
        ctx.lineTo(shapes[j].x, shapes[j].y);
        ctx.stroke();
      }
    }

    // マウスカーソルとの距離を計算
    var dx = shapes[i].x - mouseX;
    var dy = shapes[i].y - mouseY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    // マウスカーソルとの距離が近ければ、図形を避ける
    if (dist < 100) {
      var angle = Math.atan2(dy, dx);
      shapes[i].x += Math.cos(angle) * 2;
      shapes[i].y += Math.sin(angle) * 2;
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

  requestAnimationFrame(draw);
}

// マウスカーソルの位置を取得
var mouseX = 0;
var mouseY = 0;
document.addEventListener('mousemove', function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// 描画関数の呼び出し
draw();
