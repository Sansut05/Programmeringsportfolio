var gravity 
var friction  
var b
var f
var points = 1
var bSound
var currentPage='#page1'

async function setup() {
    bSound = await loadSound("/api_lib/sounds/dragon-studio-censor-beep-3-372460.mp3")
  var c = createCanvas(windowWidth, windowHeight)
  select('#page2').child(c)
  select('#startButton').mousePressed(()=> {
    userStartAudio() //starter lyd eller blokerer browseren for funktionaliteter. kunne fx ikke restarte uden//
    shiftPage('#page2')
  })

  gravity = createVector(0, 0.5)
  friction = 0.99

  select('Canvas').html(points)

  b = new Ball(windowWidth/2, 0, 48, '#d8a15b', 12)
  f = new FloatingBall(100, 100, 50, '#8b5e3c',0,4)
 
 select('#restartButton').mousePressed(()=> shiftPage('#page1'))
}

function draw() {
  background('#F5EBDD')
  b.update()
  b.constrain()
  b.show()

  if(b.hit(f)){
    points --
    bSound.play()
    CheckPoints()
  }

  select('#info').html(points)

  f.update()
  f.constrain()
  f.show()
}

function CheckPoints(){
  if(points <= 0){
   shiftPage('#page3')
   points=1
  }  

}

function keyPressed(){
  if(key == " "){     
    b.jump()
    f.jump()
  }
}


