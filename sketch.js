var PLAY = 1;
var END = 0;
var gameState = PLAY;

var city, cityImg;
var road, roadImg, invisibleGround;
var box, boxImg, wetBoxImg;

var puddle1, puddle2, puddle3, puddlesGroup;

var score;

var gameOver, gameOverImg;
var reset, resetImg;

function preload(){
  cityImg = loadImage("cityArt.png");
  roadImg = loadImage("road.png");
  boxImg = loadImage("box.png");
  wetBoxImg = loadImage("wetBox.png");

  puddle1 = loadImage("water1.png");
  puddle2 = loadImage("water2.png");
  puddle3 = loadImage("water3.png");

  gameOverImg = loadImage("gameOver.png");
  resetImg = loadImage("restart.png");
}

function setup() {
  //canvas
  createCanvas(1500,800);

  //creates city background
  city = createSprite(200,200,1500,1400);
  city.addImage("city", cityImg);

  //creates road
  road = createSprite(750,950,1500,150);
  road.addImage("road", roadImg);

  //creates box
  box = createSprite(100,500,20,20);
  box.addImage("box", boxImg);
  box.scale = 0.15;

  //creates invisible ground
  invisibleGround = createSprite(750,700,1500,100);
  invisibleGround.visible = false;

  //creates gameover image
  gameOver = createSprite(750,200)
  gameOver.addImage(gameOverImg);

  //creates restart image
  reset = createSprite(750,300);
  reset.addImage(resetImg);

  //turns game over and reset invisible
  gameOver.visible = false;
  reset.visible = false;

  //creates puddles group
  puddlesGroup = createGroup();

  //sets box collider
  box.setCollider("rectangle",0,0,20,20)

  //sets score to 0
  score = 0;
}

function draw() {
  //displays score
  text("SCORE: "+score,1200,50);

  //collides box with invisible ground
  box.collide(invisibleGround);

  //makes gamestate into play
  if(gameState === PLAY){

    //city background moving
    city.velocityX = -2;
    if(city.x<0){
      city.x = city.width/2;
    }

    //scoring system
    score = score + Math.round(frameCount/100);

    //road moving
    road.velocityX = -5;
      if(road.x<455){
      road.x = road.width/2;
    }

    //box jump commands
    if(keyDown("space")&& box.y >=100) {
      box.velocityY = -20;
    }

    //adds gravity
    box.velocityY = box.velocityY + 0.8

    //how you lose
    if(puddlesGroup.isTouching(box)){
      gameState = END;
    }
 }

  //what happens when you lose
  else if (gameState = END) {
    city.velocityX=0;
    road.velocityX=0;

    puddlesGroup.setVelocityXEach(0);
    puddlesGroup.setLifeTimeEach(-1);

    box.changeImage(wetBoxImg);
    box.velocityX=0;

    gameOver.visible = true;
    reset.visible = true;
  }

  //restarting the game

  //draws the sprites
  drawSprites();

  spawnObstacles();
}

//spawns obstacles/puddles
function spawnObstacles() {
  if (frameCount % 60 === 0){
    var puddle = createSprite(1400,750,20,20);
    puddle.velocityX = -5;
  }
    //creates random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: puddle.addImage(puddle1);
              break;
      case 2: puddle.addImage(puddle2);
              break;
      case 3: puddle.addImage(puddle3);
              break;
      default: break;
  }
}