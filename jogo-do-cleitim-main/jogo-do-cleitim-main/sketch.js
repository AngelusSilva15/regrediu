var cleitim, cleitimparado, cleitimpulando, cleitimcorendo
var PLAY = 1
var END = 0
var gamestate = PLAY
var pontos = 0
var grupoobjeto
function preload(){
  cleitimdormindo = loadImage("d1.png")
cleitimparado = loadImage("stop.png")
cleitimpulando = loadAnimation("p1.png","p2.png","p3.png","p4.png","p6.png","p7.png","p8.png")
cleitimcorendo = loadAnimation("c1.png","c2.png","c3.png","c4.png","c5.png")
soloImg = loadImage("solo.png")
obj7 = loadImage("obstacle7.png")
obj2 = loadImage("obstacle2.png")
obj3 = loadImage("obstacle3.png")
obj4 = loadImage("obstacle4.png")
obj5 = loadImage("obstacle5.png")
obj6 = loadImage("obstacle6.png")

}

function setup() {
 createCanvas(600,200)
 grupoobjeto = createGroup()
 cleitim = createSprite(80,50,50,50)
 //cleitim.addImage(cleitimparado)
 cleitim.addAnimation("correndo",cleitimcorendo)
 cleitim.addAnimation("pulando",cleitimpulando)
cleitim.addAnimation("dormindo",cleitimdormindo)

 cleitim.scale= 0.1
 
 solo = createSprite(300,190,600,20)
 solo.addImage(soloImg)
 soloiv = createSprite(300.150,600,20);
 soloiv.visible = false;
 edges = createEdgeSprites()
 cleitim.setCollider("rectangle",50,40,600,600)
 cleitim.debug = true
}

function draw() {
 background(180)
 cleitim.collide(soloiv);
 if(gamestate === PLAY) {
     gerarobjeto()
     text("pontos"+pontos,width/2,50)
if(touches.length>0|| (keyDown("space") && cleitim.y > 105)){
    cleitim.velocityY = -12
    cleitim.changeAnimation("pulando",cleitimpulando)
} 
if(cleitim.y < 100) {
  cleitim.changeAnimation("pulando", cleitimpulando);
}
text("pontos"+pontos,width/2,50)
pontos = pontos +Math.round(frameRate()/60)
if(pontos>0 && pontos%100 === 0){
  }
cleitim.velocityY = cleitim.velocityY+0.8

solo.velocityX = -6
if(solo.x<200){
solo.x = solo.width/2
}

if (cleitim.isTouching(soloiv)){
cleitim.changeAnimation("correndo", cleitimcorendo);
}

if(cleitim.isTouching(solo)){
    cleitim.changeAnimation("correndo",cleitimcorendo)
}
if(cleitim.isTouching(grupoobjeto)){
  cleitim.changeAnimation("dormindo",cleitimdormindo)
  gamestate = END
}

 }
 else if(gamestate === END){
   grupoobjeto.setVelocityXEach(0)
   solo.velocityX = 0
   cleitim.velocityX = 0

   cleitim.velocityY =0
}

 drawSprites()
}
function reset(){
    gamestate = PLAY
    gerarobjeto.destroyEach()

    cleitim.changeAnimation("correndo",cleitimcorendo)
    pontos = 0
}
function gerarobjeto(){
    if (frameCount%60===0){
       obj = createSprite(600,125,10,40)
      obj.velocityX = -6
  var rand = Math.round(random(1,6))
  switch(rand){
    case 1:obj.addImage(obj7)
  break;
  case 2:obj.addImage(obj2)
  break;
  case 3:obj.addImage(obj3)
  break;
  case 4:obj.addImage(obj4)
  break;
  case 5:obj.addImage(obj5)
  break;
  case 6:obj.addImage(obj6)
  break;
  default:break
  }
  obj.scale = 0.5
  grupoobjeto.add(obj)
  
  grupoobjeto.lifetime = 200
    }
  }