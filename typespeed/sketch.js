class TextBox {
  constructor(text, x, y, w) {
    this.fonst_size = 30;

    this.width = w;
    this.height = this.fonst_size;

    this.x = x;
    this.y = y;

    this.text = text;
  }

  getLeft() {
    return this.x;
  }

  getRight() {
    return this.x + this.width;
  }

  getTop() {
    return this.y;
  }

  getBottom() {
    return this.y + this.height;
  }

  drawBox() {
    rect(this.x, this.y, this.width, this.height);
  }

  draw() {
    noStroke();
    textSize(this.fonst_size);
    textAlign(LEFT, TOP);
    text(this.text, this.x, this.y, this.width, this.height);
  }
}

let ib, tb, cursor, w;
let correct, l_e, pos;
let dict = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function gen_text(w, w_min, w_max) {
  t = "";
  wl = int(random(w_min, w_max));

  textSize(30);

  while(textWidth(t) < w) {
    if (wl-- <= 0) {
      wl = int(random(w_min, w_max));
      t += ' ';
      continue;
    }

    t += random(dict);
  }

  return t.slice(0, -2);
}

function advance_line() {
  for (let i = 0; i < tb.length - 1; i++) {
    tb[i].text = tb[i+1].text;
  }

  tb[tb.length - 1].text = gen_text(w, 1, 5);
}

function keyPressed() {
  if (keyCode == BACKSPACE) {

    if (keyIsDown(CONTROL)) {
      correct = true;
      pos -= ib.text.length;
      ib.text = "";

    } else {
      if (ib.text.length != 0) {
        if (!correct && l_e == pos - 1) {
          correct = true;
        }
  
        pos--;
        ib.text = ib.text.slice(0, -1);
      }
    }
  } else if (key == ' ') {
    if (!correct) {
      ib.text += '_';
      pos++;
    }
    else if (tb[0].text[pos] != key && pos + 1 < tb[0].text.length) {
      correct = false;
      ib.text += '_';
      l_e = pos++;
    } else {
      ib.text = "";
      pos++;
      if (pos >= tb[0].text.length) {
        advance_line();
        pos = 0;
      }
    }
  } else if (key in dict) {
    ib.text += key;
    
    if (tb[0].text[pos] != key) {
      if (correct) {
        correct = false;
        l_e = pos;
      }
    }

    pos++;
  }
}

function setup() {
  correct = true;
  pos = 0;
  w = .7 * windowWidth;
  let x = (windowWidth - w) / 2;
  
  ib = new TextBox("", x, windowHeight * .3, w);
  
  let y = max(windowHeight * .4, windowHeight * .3 + 30);

  tb = [];
  tb.push(new TextBox(gen_text(w, 1, 5), x, y, w));
  tb.push(new TextBox(gen_text(w, 1, 5), x, y + 30, w));
  tb.push(new TextBox(gen_text(w, 1, 5), x, y + 60, w));


  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(51);

  noStroke();
  if (correct) {
    fill(70, 150, 70, 50);
  }
  else {
    fill(150, 70, 70, 50);
  }
  ib.drawBox();
  fill(120);
  ib.draw();
  
  fill(120);
  tb.forEach(box => {
    box.draw();
  });

  strokeWeight(2);
  stroke(200, 200, 70, (sin(millis() * .01)+1) / 2 * 255);
  noFill();

  let y1 = tb[0].getTop();
  let y2 = tb[0].getBottom();
  let x = tb[0].getLeft() + textWidth(tb[0].text.slice(0, correct? pos : l_e));

  line(x, y1, x, y2);
}
