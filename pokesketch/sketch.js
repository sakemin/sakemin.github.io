var canvas;

var x,y;
var map;

var img = [];
var tic;
var persp;
var step;

function setup(){
  frameRate(15);
  canvas = createCanvas(320,320);
 canvas.parent('sketchold');

  for(var i = 0; i < 4; i++){
    img[i]=[];
  }
  img [0][0] = loadImage("ui.png");
  img [0][1] = loadImage("u1.png");
  img [0][2] = loadImage("u2.png");
  img [1][0] = loadImage("ri.png");
  img [1][1] = loadImage("r1.png");
  img [1][2] = loadImage("r2.png");
  img [2][0] = loadImage("di.png");
  img [2][1] = loadImage("d1.png");
  img [2][2] = loadImage("d2.png");
  img [3][0] = loadImage("li.png");
  img [3][1] = loadImage("l1.png");
  img [3][2] = loadImage("l2.png");

  map = loadImage("pokemap.png")
  background(255,0,0);
  x=16;
  y=16;
  tic = 0;
  persp = 3;
  step = 0;
}

function draw(){
  image(map,0,0);

  if(keyIsPressed == true && step == 0){
    if(keyCode == RIGHT_ARROW){
      step=8;
      persp = 1;
    }
    else if(keyCode == UP_ARROW){
      step=8;
      persp = 0;
    }
    else if(keyCode == DOWN_ARROW){
      step=8;
      persp = 2;
    }
    else if(keyCode == LEFT_ARROW){
      step=8;
      persp = 3;
    }
  }
  else{
    if(step == 0){
      tic = 0;
    }
  }

  if(step > 0){
    step--;
    switch (persp) {
      case 0:
        y-=2;
          if(y<16){y=16;}
          else if(x==144&&y<80&&y>64){y=80;}
          else if(x>144&&x<=208&&y<=128){y=128;}
        break;
      case 1:
        x+=2;
          if(x>288){x=288;}
          else if ((x>144&&x<160&&y<128)||(x>144&&x<160&&y>144)) {x=144;}
          else if (x>128&&y==64){x=128;}
        break;
      case 2:
        y+=2;
        if(y>288){y=288;}
        else if(x==144&&y>48&&y<64){y=48;}
        else if(x>144&&x<=208&&y>=144){y=144;}
        break;
      case 3:
        x-=2;
          if(x<16){x=16;}
          else if((x<224 && x > 208&&y<128)||(x<224 && x > 208&&y>144)){x=224;}
        break;
    }
    tic++;
  }
  image(img[persp][tic%3],x,y);
}
