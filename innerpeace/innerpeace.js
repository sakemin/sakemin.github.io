var globalStrokeWeight = 5;
var globalTheta = 90;
var increasement = 0.375;
var radius = 200;
var preDotX = 0;
var preDotY = 0;
var smokeR = 60;
var tic=0;
var mindtic=0;
var sec=60;
var word;
var isSpeaking=false;
var mode=0; //0:idle, 1:mindintro, 2:mindselect, 3:depressment, 4:business, 5:helplessness, 6:rage
// variable holding our particle system
var ps = null;

var col;

var mobiusX = [];
var mobiusY = [];

function preload(){
  soundFormats('wav');
  mySound = loadSound('assets/final_innerpeace.wav');
}
function setup() {
  frameRate(60);
  createCanvas(window.innerWidth, window.innerHeight);
  ps = new ParticleSystem(0,createVector(preDotX, preDotY));
  stroke(255);
  strokeWeight(10);
  background(0);
  fft = new p5.FFT();
  mySound.setVolume(1);
  mySound.loop();
}

function draw() {
  updateWords();
  infinity();
  tic++;

}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function infinity(){
  var spectrum = fft.analyze();
  spectralCentroid = fft.getCentroid();
  console.log(spectralCentroid);
  col = map(spectralCentroid,750,900,0,180);
  if(col>180){col=180;}
  var bassbeat = fft.getEnergy("bass");
  var dotSize = map(bassbeat,100,250,3,15);
  /*if((globalTheta>=80 && globalTheta <85)||(globalTheta>=95 && globalTheta <100)||(globalTheta>=260 && globalTheta <265)||(globalTheta>=275 && globalTheta <280)){
    globalTheta +=2*increasement;
  }
  else if((globalTheta>=85 && globalTheta <95)||(globalTheta>=265 && globalTheta <275)){
    globalTheta +=8*increasement;
  }
  else{
    globalTheta += 1*increasement;
  }*/
  globalTheta += 1*increasement;
  if(globalTheta >= 360){
    globalTheta = 0;
  }
  background(0);
  translate(width/2,2*height/5);
  if(isSpeaking){
    translate(randomGaussian(0,1)*0.5,randomGaussian(0,1)*0.5);
    beginShape();
    for(var theta=0; theta<390; theta+=10){
      var r = 1 + cos(2*radians(theta));
      var rr = radius*r;
      var localDotX = rr*cos(radians(theta));
      var localDotY = rr*sin(radians(theta));
      strokeWeight(3);
      stroke(col,180,0,50);
      curveVertex(localDotX,localDotY);
    }
    endShape();
    beginShape();
    for(var theta=0; theta<390; theta+=10){
      var r = 1 + cos(2*radians(theta));
      var rr = radius*r*0.9;
      var localDotX = rr*cos(radians(theta));
      var localDotY = rr*sin(radians(theta));
      strokeWeight(3);
      stroke(col,180,0,50);
      curveVertex(localDotX,localDotY);
    }
    endShape();
    beginShape();
    for(var theta=0; theta<390; theta+=10){
      var r = 1 + cos(2*radians(theta));
      var rr = radius*r*1.1;
      var localDotX = rr*cos(radians(theta));
      var localDotY = rr*sin(radians(theta));
      strokeWeight(3);
      stroke(col,180,0,50);
      curveVertex(localDotX,localDotY);
    }
    endShape();
    }

  for(var theta=0; theta<360; theta+=10){
    var r = 1 + cos(2*radians(theta));
    var rr = radius*r;
    var localDotX = rr*cos(radians(theta));
    var localDotY = rr*sin(radians(theta));
    strokeWeight(dotSize);
    stroke(col,180,0);
     point(localDotX,localDotY);
    localDotX = 0.9*localDotX;
    localDotY = 0.9*localDotY;
     point(localDotX,localDotY);
    localDotX = (10/9)*1.1*localDotX;
    localDotY = (10/9)*1.1*localDotY;
     point(localDotX,localDotY);
  }

    var r = 1 + cos(2*radians(globalTheta));
    var rr = radius*r;
    var dotX = rr*cos(radians(globalTheta));
    var dotY;
    if(globalTheta >= 90 && globalTheta <270){
      dotY = -rr*sin(radians(globalTheta));
    }
    else{
      dotY = rr*sin(radians(globalTheta));
    }
    //strokeWeight(15);
    //point(dotX,dotY);


    //----------------
    var dx = preDotX-dotX;
    var dy = preDotY-dotY;
    var wind = createVector(0.02*dx,0.02*dy);

    ps.reLocate(createVector(dotX, dotY))
    ps.applyForce(wind);
    ps.run();
    for (var i = 0; i < 2; i++) {
        ps.addParticle();
    }


    preDotX=dotX;
    preDotY=dotY;
}

function updateWords()
{
  if(mode==0){//idle
    toggleWords("#w0-1",3,7);
    toggleWords("#w0-2",9,13);
    toggleWords("#w0-3",15,19);
    toggleWords("#w0-4",21,25);

    if((tic>=25*sec)&&(tic%(15*sec)==0)){
      showWords("#wr-"+floor(random(1,14)));
      isSpeaking=true;
    }if((tic>=25*sec)&&(tic%(15*sec)==2*sec)){
      isSpeaking=false;
    }
    if((tic>=25*sec)&&(tic%(15*sec)==4*sec)){
      hideWords();
    }
    if((tic>=21*sec)&&mouseIsPressed){
      hideWords();
      mode=1;
      tic=0;
    }
  }

  if(mode==1){//mindintro
    toggleWords("#w1-1",1,5);
    toggleWords("#w1-2",7,11);
    toggleWords("#w1-3",13,18);
    toggleWords("#w1-4",20,25);
    toggleWords("#w1-5",27,32);
    toggleWords("#w1-6",34,38);
    toggleWords("#w1-7",40,44);
    toggleWords("#w1-8",46,50);
    toggleWords("#w1-9",52,55);
    if(tic==60*sec){
      mode = 2;
      tic=0;
    }
  }

  if(mode==2){//mindselect
    toggleWords("#w2-1",1,4);
    if(tic==5*sec){
      showWords("#w2-2");
      showWords("#w2-3");
      showWords("#w2-4");
      showWords("#w2-5");
    }
  }

  if(mode==3){//depressment
    toggleWords("#w3-1",1,5);
    toggleWords("#w3-2",7,11);
    toggleWords("#w3-3",13,17);
    toggleWords("#w3-4",19,23);
    toggleWords("#w3-5",25,28);
    toggleWords("#w3-6",29,32);
    toggleWords("#w3-7",34,38);
    toggleWords("#w3-8",40,45);
    toggleWords("#w3-9",47,51);
    toggleWords("#w3-10",53,57);
    toggleWords("#w3-11",59,63);
    toggleWords("#w3-12",67,71);
    toggleWords("#w3-13",73,77);
    toggleWords("#w3-14",79,83);
    toggleWords("#w3-15",85,89);
    toggleWords("#w3-16",92,96);
    toggleWords("#w3-17",98,102);
    toggleWords("#w3-18",104,107);
    toggleWords("#w3-19",109,112);
    toggleWords("#w3-20",116,120);
    toggleWords("#w3-21",122,126);
    toggleWords("#w3-22",128,132);
    toggleWords("#w3-23",134,138);
    toggleWords("#w3-24",142,146);
    toggleWords("#w3-25",148,152);
    toggleWords("#w3-26",154,158);
    toggleWords("#w3-27",160,164);
    toggleWords("#w3-28",168,172);
    toggleWords("#w3-29",174,178);
    toggleWords("#w3-30",180,184);
    toggleWords("#w3-31",186,190);
    toggleWords("#w3-32",192,196);
    if(tic==196*sec){
      tic=22*sec;
      mode=0;
    }
  }

  if(mode==4){//business
    toggleWords("#w4-1",1,5);
    toggleWords("#w4-2",7,11);
    toggleWords("#w4-3",13,17);
    toggleWords("#w4-4",19,23);
    toggleWords("#w4-5",25,29);
    toggleWords("#w4-6",30,34);
    toggleWords("#w4-7",38,42);
    toggleWords("#w4-8",44,48);
    toggleWords("#w4-9",50,54);
    toggleWords("#w4-10",56,60);
    toggleWords("#w4-11",62,66);
    toggleWords("#w4-12",68,72);
    toggleWords("#w4-13",74,78);
    toggleWords("#w4-14",80,84);
    toggleWords("#w4-15",86,90);
    toggleWords("#w4-16",92,96);
    toggleWords("#w4-17",100,104);
    toggleWords("#w4-18",108,112);
    toggleWords("#w4-19",114,118);
    toggleWords("#w4-20",122,126);
    toggleWords("#w4-21",128,132);
    toggleWords("#w4-22",136,140);
    toggleWords("#w4-23",142,146);
    toggleWords("#w4-24",148,152);
    toggleWords("#w4-25",156,160);
    toggleWords("#w4-26",162,166);
    toggleWords("#w4-27",168,172);
    toggleWords("#w4-28",176,180);
    toggleWords("#w4-29",182,186);
    toggleWords("#w4-30",190,194);
    toggleWords("#w4-31",198,202);
    toggleWords("#w4-32",204,208);
    toggleWords("#w4-33",210,214);
    if(tic==214*sec){
      tic=22*sec;
      mode=0;
    }
  }

  if(mode==5){//helplessness
    toggleWords("#w5-1",1,5);
    toggleWords("#w5-2",7,11);
    toggleWords("#w5-3",13,17);
    toggleWords("#w5-4",19,23);
    toggleWords("#w5-5",25,29);
    toggleWords("#w5-6",30,34);
    toggleWords("#w5-7",36,40);
    toggleWords("#w5-8",44,48);
    toggleWords("#w5-9",50,55);
    toggleWords("#w5-10",57,61);
    toggleWords("#w5-11",65,70);
    toggleWords("#w5-12",74,78);
    toggleWords("#w5-13",80,84);
    toggleWords("#w5-14",86,90);
    toggleWords("#w5-15",92,96);
    toggleWords("#w5-16",98,102);
    toggleWords("#w5-17",104,108);
    toggleWords("#w5-18",110,114);
    toggleWords("#w5-19",117,122);
    toggleWords("#w5-20",124,128);
    toggleWords("#w5-21",130,134);
    toggleWords("#w5-22",138,142);
    toggleWords("#w5-23",144,148);
    toggleWords("#w5-24",150,155);
    if(tic==155*sec){
      tic=22*sec;
      mode=0;
    }
  }

  if(mode==6){//rage
    toggleWords("#w6-1",1,5);
    toggleWords("#w6-2",7,11);
    toggleWords("#w6-3",13,17);
    toggleWords("#w6-4",19,23);
    toggleWords("#w6-5",25,29);
    toggleWords("#w6-6",31,35);
    toggleWords("#w6-7",37,41);
    toggleWords("#w6-8",43,47);
    toggleWords("#w6-9",49,53);
    toggleWords("#w6-10",55,59);
    toggleWords("#w6-11",61,65);
    toggleWords("#w6-12",67,71);
    toggleWords("#w6-13",73,77);
    toggleWords("#w6-14",79,83);
    toggleWords("#w6-15",87,91);
    toggleWords("#w6-16",93,97);
    toggleWords("#w6-17",101,105);
    toggleWords("#w6-18",109,113);
    toggleWords("#w6-19",115,119);
    toggleWords("#w6-20",121,125);
    toggleWords("#w6-21",127,131);
    toggleWords("#w6-22",136,140);
    toggleWords("#w6-23",142,146);
    toggleWords("#w6-24",148,152);
    toggleWords("#w6-25",154,158);
    toggleWords("#w6-26",160,164);
    if(tic==164*sec){
      tic=22*sec;
      mode=0;
    }
  }
}

function showWords(_str){
  word=select(_str);
  word.style("display","block");
}

function hideWords(){
  word.style("display","none")
}
function hideSpecificWords(_str){
  word=select(_str);
  word.style("display","none")
}

function toggleWords(_str,a,b){
  if(tic==a*sec){
    showWords(_str);
    isSpeaking=true;
  }
  if(tic==(a+b)/2*sec){
    isSpeaking=false;
  }
  if(tic==b*sec){
    hideWords();
  }
}

function feelChoose(n){
  mode=n;
  tic=0;
  hideSpecificWords("#w2-2");
  hideSpecificWords("#w2-3");
  hideSpecificWords("#w2-4");
  hideSpecificWords("#w2-5");
}
