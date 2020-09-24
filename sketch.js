var backGround,backgroundImg;
var sword,swordcutting,swordImg;
var fruit,fruit2,fruitImg1,fruitImg2,fruitImg3,fruitImg4;
var monsters,monstersImg;
var rand;
var fruitGroup;
var enemyGroup;
var gameOver,gameOverImg;
var hitSound;
var score = 0;
var position

//Game states
var PLAY = 1;
var END = 0;
var gameStates = PLAY;


function preload(){
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  swordImg = loadImage("sword.png");
  
  backgroundImg = loadImage("woodbackground.jpg");
  
  monstersImg = loadImage("bomber.png");
  
  gameOverImg = loadImage("gameover.png");
  
  hitSound = loadSound("knifeSwooshSound.mp3")
  
}

function setup(){
 createCanvas(600,600);
  backGround = createSprite(300,300,600,600);
  backGround.addImage("bgImg",backgroundImg);
  
  sword = createSprite(300,300,15,15);
  sword.addImage("swordplayer",swordImg);
  sword.scale = 0.6;
  
  gameOver = createSprite(300,300,15,15);

  fruitGroup = new Group();
  enemyGroup = new Group();
}

function draw(){
  
   background("white");
  
  if(gameStates === PLAY){
      sword.y = mouseY;
      sword.x = mouseX;
    
      
    
      if(fruitGroup.isTouching(sword)){
         
         fruitGroup.destroyEach();
         score = score + 3; 
         hitSound.play();
         }
    
    
          
      gameOver.visible = false;
      fruits();
    
    if(enemyGroup.isTouching(sword)){
               enemyGroup.destroyEach();
                sword.visible = false;
             
             enemyGroup.setVelocityEach(0);
                
             gameStates = END;
  }
     enemy();
  }
  else if(gameStates === END){
    
             gameOver.visible = true;
             gameOver.addImage("gameover",gameOverImg);
             gameOver.scale = 1;
             
           }
  
  
  
  
  
  
  drawSprites();
  
  fill("black");
  text("Score: ",500,20);
  text(score,540,20)
}
     
  
  
  
  
  



//Function for monsters and fruits
function fruits(){
  if(frameCount % 80 ===0){
     fruit = createSprite(600,200,20,20);
     //fruit.debug = true
     rand = Math.round(random(1,4));
     if(rand == 1) {
        fruit.addImage(fruit1); 
    } else if (rand  == 2){
                fruit.addImage(fruit2);
    } else if (rand == 3){
                fruit.addImage(fruit3);
    } else {
            fruit.addImage(fruit4);
    }
     fruit.scale = 0.2;
     fruit.y = Math.round(random(50,340));
     fruit.velocityX = -7
     fruit.setLifetime = 100;
    
      fruitGroup.add(fruit);
    
    // second postion
    position = Math.round(random(1,2))
    
    
    if(position === 1){
        fruit.x = 600;
        fruit.velocityX = -(7+(score/4));
    }
    else{
          if(position === 2){
             fruit.x = 0; 
            
            fruit.velocityX = (7+(score/4));
          }
    }
    }
    
  }

function enemy(){
  if(frameCount % 200 === 0){
      monsters = createSprite(600,200,20,20);
      monsters.addImage("bomber",monstersImg);
      monsters.scale = 0.2;
      monsters.y = Math.round(random(100,300));
      monsters.velocityX = -8;
      monsters.setLifeTime = 50;
    
      //monsters.debug = true;
      monsters.setCollider("circle",0,0,20)
    
      enemyGroup.add(monsters);
      
  }
}