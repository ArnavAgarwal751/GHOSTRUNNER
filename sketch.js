var towerImg,tower,spookySound;
var door,doorImg,doorsGroup;
var climberImg,climber,climbersgroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg)
  ghost.scale = 0.5;
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw(){
  
  background(0);
  
  if (gameState === "play"){
    
  if(tower.y > 600) {
    tower.y = 100;
  }
  
  if(keyDown("right_arrow")){
    
    ghost.x = ghost.x + 3;
    
  }
 
  if(keyDown("left_arrow")){
    
    ghost.x = ghost.x - 3;
    
  }
  
  if(keyDown("space")){
    
    ghost.velocityY = -5;
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.1;
  
  if(climbersGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
    
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    
    ghost.destroy();
    
    gameState = "end";
    
  }
  
  spawnDoor();
  
  drawSprites();
  
  }

  if (gameState === "end" ){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GameOver",250,250);
    
  }
  }
 function spawnDoor (){
   
   if (frameCount % 250 === 0){
     
     door= createSprite(300,-50);
     door.addImage(doorImg);
     door.x = Math.round(random(150,300));
     door.velocityY = 3;
     door.lifetime = 200;
     doorsGroup.add(door);
     
     climber = createSprite(300,20);
     climber.addImage(climberImg);
     climber.velocityY = 3;
     climber.x = door.x;
     climber.lifetime = 200;
     climbersGroup.add(climber);
     
     invisibleBlock = createSprite(200,15);
     invisibleBlock.width = climber.width;
     invisibleBlock.height = 2;
     invisibleBlock.x = door.x;
     invisibleBlock.velocityY = 3;
     invisibleBlock.debug = true;
     invisibleBlockGroup.add(invisibleBlock);
     
     ghost.depth = door.depth;
     ghost.depth = ghost.depth + 1;
     
   
   }
 }
