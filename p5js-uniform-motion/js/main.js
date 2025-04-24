// この作品は 256times - https://256times.com/ で制作されました。

const canvasWidth = 640; // キャンバスの幅
const canvasHeight = 400; // キャンバスの高さ
const fromColor = 'black'; // 背景色1
const toColor = 'purple'; // 背景色2
let x = 320; // アニメーションの基準x座標
let y = 200; // アニメーションの基準y座標
let directionX = directionY = 1; // アニメーションの方向
let hat = -30; // 帽子の向き
let body = -40; // 体の向き
let start = 0; // しっぽの向き(始)
let stop = Math.PI /2; // しっぽの向き(終)

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(0);

  showLicense();
}

function draw() {
  noStroke();
  
  // 背景
  let num = 80; // 四角形を描画する数
  let h = height / num; // 四角形の高さ
  // 背景色1から2のグラデーション
  for (let i = 0; i <= num; i++) {
    let bgColor = lerpColor(color(toColor), color(fromColor), i / num);
    fill(bgColor);
    rect(0, h * i, width, h);
  }
  
  // 星
  drawStar(20, 160, 80); // 大
  drawStar(30, 430, 60); // 中
  for (let i = width / 6; i < width; i+=240) { // 小
    drawStar(10, i - 20, 50);
    drawStar(10, i + 120, 100);
    drawStar(8, i - 50, 130);
  }
  
  // 本体
  angleMode(RADIANS);
  fill('#fff');
  arc(x, y, 80, 80, PI, PI * 2); // 顔の部分
  // arc(x + 40, y, 160, 160, HALF_PI, PI); // 体(左向き)
  // arc(x - 40, y, 160, 160, 0, HALF_PI); // 体(右向き)
  arc( x + body, y, 160, 160, start, stop); // 体(変数)
  
  // 手
  arc(x + 40, y, 35, 30, -PI / 6, PI);
  arc(x - 40, y, 35, 30, 0, PI + PI / 6);
  
  // 帽子
  fill(0);
  // triangle(x, y - 80, x, y - 100, x + 30, y - 80); // 折り返し部分(右)
  triangle(x, y - 84, x, y - 100, x + hat, y - 80); // 折り返し部分(変数)
  triangle(x - 30, y - 30, x, y - 100, x + 30, y - 30); // 中央
  arc(x, y - 42, 80, 40, 0, PI); // ツバの部分
  push(); // 帽子のリボン
  noFill();
  stroke('orange');
  strokeWeight(3);
  arc(x, y - 42, 48, 16, 0, PI);
  pop();
  
  // 目
  fill(0);
  circle(x - 15, y - 10, 15);
  circle(x + 15, y - 10, 15);
  
  // 口
  arc(x, y + 5, 42, 28, 0, PI);
  
  // xとyを動かす
  x += 1 * directionX;
  y += 1 * directionY;
  
  // xとyが領域の端まで動いたとき
  if (x < 40 + 20 || x > width - 40 - 20) {
    directionX *= -1;
    if (x > width - 40 - 20) { // 右端
      body = 40; // 胴体の向き
      start = Math.PI / 2; // しっぽの向き(始)
      stop = Math.PI; // しっぽの向き(終)
      hat = 30; // 帽子の先の向き
    } else if (x < 40 + 20) { // 左端
      body = -40;
      start = 0;
      stop = Math.PI /2;
      hat = -30;
    }
  }
  if (y < 160 || y > height - 140) {
    directionY *= -1;
  }
}

// 星を描画する
function drawStar(outR, tx, ty) {
  push();
  beginShape();
  fill('orange');
  angleMode(DEGREES);
  translate(tx, ty); // 基準の座標
  
  for (let i = 0; i < 10; i++) { // 10 = 星の頂点の数
    let inR = outR / 2;
    let r = i % 2 ? outR : inR;
    let theta = i * 360 / 10;
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

function showLicense() {
  const main = document.querySelector('main');
  const licenceText = "この作品は <a href='https://256times.com/' target='_blank' rel='noreferrer'>256times</a> で作成されました。";
  const licenceElem = document.createElement('p');
  licenceElem.style.fontSize = '0.9rem';
  licenceElem.style.width = canvasWidth + 'px';
  licenceElem.style.textAlign = 'center';
  main.appendChild(licenceElem);
  licenceElem.innerHTML = licenceText;
}