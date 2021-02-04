var playercar,playercarimg;
var road, roadImg;
var car, carImg;
var policeImg
var score;
var logo, logoImg
var startImg, startImage;
var carGroup;
var monsterTruck;

var GAMESTATE = 1;
var PLAY = 1;
var END = 0;
var PAUSESTATE = 2;

var over;
var cursor1;
var resetImg;
var pausereset, pauseImg;
var resetPauseImg;
var startgame;

function preload(){
  
 roadImg = loadAnimation("carracingimage.jpg");
 carImg = loadImage("car.png");
 monsterTruck = loadImage("MONSTERTRUCK.png");
 logoImg = loadImage("logoforgame.png")
 policeImg = loadImage("police.png");
 taxi1 = loadImage("taxi.png");
 fire = loadImage("firewicket.png");
 resetImg = loadImage("resetbutton.png");
 pauseImg = loadImage("pauseimg.png")
 resetPauseImg = loadImage("gamereset.png");
 startImage = loadImage("startracing.jpg");
 startImg = loadImage("start.png");
 purple1 = loadImage("purplecar.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight);
  
  road = createSprite(width/2,200,10,10);
  road.addAnimation("roadImg",roadImg);
  road.scale = 2;
  
  road1 = createSprite(width/2,600,10,10);
  road1.addAnimation("roadImg",roadImg);
  road1.scale = 1.350;
  
  score = 0;

  road2 = createSprite(width/2,400,10,10);
  road2.addAnimation("roadImg",roadImg);
  road2.scale = 1.350;
  
  startgame = createSprite(width/2,300,10,10);
  startgame.addImage(startImg);
  startgame.scale = 3;
  startgame.visible = false;
  
  start = createSprite(width/2,height-300,40,20);
  start.addImage(startImg);
  start.scale = 0.150;
  
  over = createSprite(width/2,100,20,20);
  over.visible = false;
  over.addImage(resetImg);
  over.scale = 0.7;
  
  logo = createSprite(width/2,height-600,20,20);
  logo.addImage(logoImg);
  logo.scale = 2;
  
  car = createSprite(800,320,10,10);
  car.addImage(carImg);
  car.scale = 0.150;
  
  carGroup = new Group();
  
  GAMESTATE = 3;
  PAUSESTATE = 2;
  PLAY = 1;
  END = 0;
  STARTSTATE = 3;

  over.depth = car.depth + 1;
  over.depth = carGroup.depth;
  over.depth = over.depth + 1;
}

function draw(){
  background("lightgreen")
  
  cursor("cursor1")
  
  if(GAMESTATE === PLAY) {
   car.visible = true;
   road1.velocityY = 10;
   road2.velocityY = 10;
   road.velocityY =  10;
  
  spawnTruck();
  spawnCar();
  taxi();
  fire1();
  purple();
  
  if(car.isTouching(carGroup)) {
      road1.velocityY = 0;
      road2.velocityY = 0;
      road.velocityY =  0;
      carGroup.setVelocityYEach(0);
      GAMESTATE = END;
      carGroup.setLifetimeEach(-1);
}

  if(carGroup.x < width/5.6) {
          carGroup.destroyEach();
}
  
     if (road.y > 400) {
    road.y = 0;
  }
  
  if(carGroup.isTouching(carGroup)) {
      carGroup.destroyEach();
  }
  
  if (road1.y > 400) {
    road1.y = 0;
  }
  
  if (road2.y > 200)  {
    road2.y = -100;
  }

  if (keyDown("LEFT_ARROW")) {
      car.x = car.x-5;
  }
  
  if (keyDown("RIGHT_ARROW")) {
      car.x = car.x+5;
  }
 } 
 
  else if(GAMESTATE === END) {
       over.visible = true;
       if(mousePressedOver(over)) {
           reset();
      }
   } 
   
  else if (GAMESTATE === STARTSTATE) {
      startgame.visible = true;
      car.visible = false;

  if (mousePressedOver(start)) {
        reset();
        start.visible = false;
        startgame.visible = false;
        logo.visible = false;
   }
}

drawSprites();
}

function spawnTruck() {
  
  if (frameCount % 200 === 0) {
    var car = createSprite(400,0,40,10);
    car.x = Math.round(random(width/2,width/5));
    car.addImage(monsterTruck);
    car.scale = 0.8;
    car.velocityY = Math.round(random(10,20))
    car.lifetime = 200;
    car.setCollider("rectangle",10,0,100,180)
    
    carGroup.add(car);
  }
}

function spawnCar() {
  
  if (frameCount % 280 === 0) {
    var car = createSprite(400,0,40,10);
    car.x = Math.round(random(width/1.5,width/5.5));
    car.addImage(policeImg);
    car.scale = 0.350;
    car.velocityY = Math.round(random(8,20));
    car.lifetime = 200;
    car.setCollider("rectangle",10,0,130,400);
  
    carGroup.add(car);
}
}

function taxi() {
  
  if (frameCount % 120 === 0) {
    var car = createSprite(width/2,-30,40,10);
    car.x = Math.round(random(width/1.5,width/4));
    car.addImage(taxi1);
    car.scale = 0.4;
    car.velocityY = 14;
    car.lifetime = 200;
    car.setCollider("rectangle",10,0,100,400);
    
    carGroup.add(car);
  }
}

function fire1() {
  if (frameCount % 300 === 0) {
    var car = createSprite(width/2,height-50,40,10);
    car.x = Math.round(random(width/2,width/3.4));
    car.addImage(fire);
    car.scale = 1;
    car.velocityY = Math.round(random(-10,-20));
    car.lifetime = 200;
    car.setCollider("rectangle",199,0,-60,230);
    
    carGroup.add(car);
  }
}

function purple() {
  if (frameCount % 150 === 0) {
    var car = createSprite(width/2,-20,40,10);
    car.x = Math.round(random(width/2,width/4));
    car.addImage(purple1);
    car.scale = 0.375;
    car.velocityY = Math.round(random(15,20));
    car.lifetime = 200;
    car.setCollider("rectangle",0,0,-140,389);
  
    carGroup.add(car);
  }
}

function reset() {
  GAMESTATE = PLAY;
  
  car.x = width/2;
  car.y = height-200;
 
  road1.velocityY = 10;
  road.velocityY = 10;
  road2.velocityY = 10;
  over.visible = false;
  carGroup.destroyEach();
}