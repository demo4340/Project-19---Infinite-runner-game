var scene,sceneImage;
var boy,boyImage;
var coin,coinImage,coinGroup;
var count = 0;
var ground;
var bomb,bombImage,bombGroup;
var blastImage;
var overImage,over;
var gameState = "play";
var restart,restartImage;

function preload(){
  sceneImage = loadImage("background image.jpg");
  boyImage = loadAnimation("boy 1.png","boy 2.png");
  coinImage = loadImage("coin.png");
  bombImage = loadImage("bomb.png");
  blastImage = loadImage("blast.png");
  overImage = loadImage("over.jpg");
  restartImage = loadImage("restartimg.png");
}

function setup() {
 createCanvas(800,400);
  
  scene = createSprite(400,110);
  scene .addImage("scene",sceneImage);
  scene.velocityX = -2;
  scene.scale = 1.5;
  
  boy = createSprite(200,270);
  boy.addAnimation("boy",boyImage);
  boy.scale = 0.5;
  
  ground = createSprite(400,350,800,10);
  ground.visible = false;
  coinGroup = new Group();

  bombGroup = new Group();
  
  over = createSprite(340,200);
  over.addImage("over",overImage);
  over.scale = 1.5;
  over.visible = false;
  
  restart = createSprite(650,350);
  restart.addImage("restart",restartImage);
  restart.scale = 0.4;
  restart.visible = false;
}
  
function draw() {
 background("black");
  if(gameState==="play"){
     
     
  if(scene.x<250){
     scene.x  = width/2;
     }
  
  if(keyDown("space")){
     boy.velocityY = -5;     
     }
    
      boy.velocityY =  boy.velocityY + 0.8;
  
  
  boy.collide(ground);
  coins();
  
  if(boy.isTouching(coinGroup)){
     coinGroup.destroyEach();
    count = count + 1;
     }
  
  bombs();
    if(boy.isTouching(bombGroup)){
   
      gameState = "end";
      
      
     }
  }
  if(gameState==="end"){
   over.visible = true;
      coinGroup.destroyEach();
    bombGroup.destroyEach();
    boy.visible = false;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
       Restart();
       }
     }
 drawSprites();
  
  fill("blue");
  textSize(20);
  text("score : " + count, 600,50);
}

function coins(){
  if(frameCount%150===0){
     coin = createSprite(100,50);
  coin.addImage("coin",coinImage);
    coin.x = Math.round(random(50,750));
    coin.y = Math.round(random(50,300));
    coin.velocityX = -2;
    
  coin.scale = 0.06;
    coinGroup.add(coin);
     }
}
  
  function bombs(){
    if(frameCount%150===0){
     bomb = createSprite(100,50);
  bomb.addImage("bomb",bombImage);
    bomb.x = Math.round(random(50,750));
    bomb.y = Math.round(random(50,300));
    bomb.velocityX = -2;
    
  bomb.scale = 0.03;
    bombGroup.add(bomb);
     }
  
  }

function Restart(){
  gameState = "play";
  count = 0;
  over.visible = false;
  restart.visible = false;
  boy.visible = true;
}
    
  
