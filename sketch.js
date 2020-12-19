var door, doorImg, santa, santaImg, tower, candywall, railing, railimg,  windowGroup, invisiblerail;

var Play = 1;
var End = 0;
var Gamestate = Play

function preload(){
  candywall = loadImage("candywall.png")
  doorImg = loadImage("christmas-window-3694876_1280.png")
  santaImg = loadImage("santa.png")
  railimg = loadImage("climber.png")
  
}

function setup(){
  createCanvas(600, 600)
  tower = createSprite(300,300);
  tower.addImage(candywall)
  tower.velocityY = 3;
  
  santa = createSprite(300, 300)
  santa.addImage(santaImg)
  santa.scale = 0.02;
  
  windowGroup = createGroup();
  railGroup = createGroup();
invisiblerailGroup = createGroup();
  
}

function draw(){
  
  if (Gamestate === Play){
   if(tower.y > 500){
    tower.y = 300
  }
    
  
  if(keyDown("left_arrow")){
    santa.x = santa.x - 5;
  }
  
  if(keyDown("right_arrow")){
    santa.x = santa.x + 5;
  }
  
  if(keyDown("space")){
    santa.velocityY = -4
  }
  
  if(santa.isTouching(railGroup)){
    santa.velocityY = 0
  }
  
  if(invisiblerailGroup.isTouching(santa)||santa.y>600){
    santa.visible = false;
    Gamestate = End
  }
  
  santa.velocityY = santa.velocityY + 0.08;
  spawnDoors();
    drawSprites();
  }
  
  if(Gamestate === End){
    textSize(50)
    fill("green")
    text("R to Restart", 250, 300)
    
  }
  if(keyDown("r") && Gamestate ===End){
      Gamestate = Play;
      santa.y = 300;
    santa.visible = true;
    }
  
}

function spawnDoors(){
  if(frameCount%90===0){
    var x = Math.round(random(100,500))
    door = createSprite(x,0)
    rail = createSprite(x, 50)
    invisiblerail = createSprite(x, 60, 50, 10)

    rail.addImage(railimg);
    door.addImage(doorImg);
    door.scale = 0.08
    door.velocityY = 3;
    rail.velocityY = 3;
    invisiblerail.velocityY = 3;
      door.depth = santa.depth;
      rail.depth = santa.depth;

    santa.depth = santa.depth+1;


    door.lifetime = 250;
    rail.lifetime = 250;
    invisiblerail.lifetime = 250
    invisiblerail.visible = false;
    windowGroup.add(door);
    railGroup.add(rail);
    invisiblerailGroup.add(invisiblerail);
  }
  
  
}



