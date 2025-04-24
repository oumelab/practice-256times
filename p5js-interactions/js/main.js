// この作品は 256times - https://256times.com/ で制作されました。
let mode = "pen";
let prev;
const canvasWidth = 640;
const canvasHeight = 400;
const colors = [
  [128, 128, 128], // gray
  [255, 105, 180], // pink
  [255, 255, 0], // yellow
  [0, 191, 255], // blue
  [0, 255, 127], // green
];

let drawColor = colors[0];
let penColor = colors[0];
let markerColor = colors[0];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    drawBg();
    drawTools();

    prev = {x: 0, y: 0};

    showLicense();
}

function draw() {
  if (
    (mouseX < 80 && mouseY > 20 && mouseY < 200) ||
    (mouseX > 15 && mouseX < 50 && mouseY > 200)
  ) {
    cursor("pointer");
    return;
  }

  cursor("default");
  if (mouseIsPressed === true) {
    if (mode === "pen") {
      stroke(penColor);
      strokeWeight(2);
      line(mouseX, mouseY, pmouseX, pmouseY);
    } else if (mode === "marker") {
      fill([...markerColor, 10]);
      noStroke();
      const d = dist(prev.x, prev.y, mouseX, mouseY);
      const n = d / 2;
      for (let i = 0; i < n; i++) {
        const t = i / n;
        const x = lerp(prev.x, mouseX, t);
        const y = lerp(prev.y, mouseY, t);
        rectMode(CENTER);
        rect(x, y, 20);
      }
    }
  }

  prev.x = mouseX;
  prev.y = mouseY;
}

function drawTools() {
  stroke("#dcdcdc");
  fill(255);

  // ペン
  // ペンの軸
  strokeWeight(2);
  fill(255);
  if (mode === "pen") {
    stroke("gray");
  } else {
    stroke("#dcdcdc");
  }
  beginShape();
  vertex(0, 20);
  vertex(20, 20);
  vertex(55, 28);
  vertex(55, 43);
  vertex(20, 50);
  vertex(0, 50);
  endShape(CLOSE);

  // ペンの芯
  fill(penColor);
  noStroke();
  triangle(55, 28, 80, 35, 55, 43); // ペンの芯

  rectMode(CORNER);
  fill([...penColor, 40]); // ペンの軸の色
  rect(0, 20, 20, 30);

  //マーカー
  // マーカーの軸
  strokeWeight(2);
  fill(255);
  if (mode === "marker") {
    stroke("gray");
  } else {
    stroke("#dcdcdc");
  }
  beginShape();
  vertex(0, 70);
  vertex(20, 70);
  vertex(55, 85);
  vertex(55, 105);
  vertex(20, 120);
  vertex(0, 120);
  endShape(CLOSE);

  // マーカーの芯
  fill(markerColor);
  noStroke();
  beginShape();
  vertex(55, 88);
  vertex(72, 88);
  vertex(67, 103);
  vertex(55, 103);
  endShape(CLOSE);
  fill([...markerColor, 40]); // マーカーの軸の中の芯
  rect(40, 88, 15, 15);

  // 消しゴム（クリア）
  fill(255);
  stroke("#dcdcdc");
  rect(0, 140, 60, 45, 0, 10, 10, 0);
  noStroke();
  fill(220, 220, 220, 90);
  rect(0, 136, 30, 53);

  // 色
  for (i = 1; i < colors.length + 1; i++) {
    stroke("gray");
    strokeWeight(1);
    fill(colors[i - 1]);
    circle(30, 180 + i * 40, 30);
  }
}

function drawBg() {
  background("#fffffc");
  stroke("#f5f5f5");

  for (let x = 20; x < 640; x += 20) {
    line(x, 0, x, 400);
  }
  for (let y = 20; y < 400; y += 20) {
    line(0, y, 640, y);
  }
}

function mousePressed() {
  if (mouseX < 80 && mouseY > 20 && mouseY < 50) {
    // ペン
    mode = "pen";
    drawTools();
  } else if (mouseX < 72 && mouseY > 70 && mouseY < 120) {
    // マーカー
    mode = "marker";
    drawTools();
  } else if (mouseX < 60 && mouseY > 140 && mouseY < 180) {
    // クリア
    drawBg();
    drawTools();
  } else if (mouseX > 15 && mouseX < 50) {
    //色
    if (mouseY > 205 && mouseY < 235) {
      drawColor = colors[0];
    } else if (mouseY > 245 && mouseY < 275) {
      drawColor = colors[1];
    } else if (mouseY > 285 && mouseY < 315) {
      drawColor = colors[2];
    } else if (mouseY > 325 && mouseY < 355) {
      drawColor = colors[3];
    } else if (mouseY > 365 && mouseY < 395) {
      drawColor = colors[4];
    }
    if (mode === "pen") {
      // ペンorマーカーの色を変更
      penColor = drawColor;
    } else if (mode === "marker") {
      markerColor = drawColor;
    }
    drawTools();
  }
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
