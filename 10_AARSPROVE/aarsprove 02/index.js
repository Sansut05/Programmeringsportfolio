var currentPage = '#page1'


let questions = [
    {
        "spørgsmål": "2 +2 =4",
        "svar": true
    },
    {
        "spørgsmål": "Jorden er flad",
        "svar": false},
        {
        "spørgsmål": "Der er 365 dage på et år",
        "svar": true
    },
    {
        "spørgsmål": "Der er 23 timer på et døgn",
        "svar": false
    },
    { "spørgsmål": "Python er et slangord for slange",
      "svar": true
    },
    

]
var q = 0
var score = 0
var resetGame 
function setup(){
    noCanvas() 
   select('#startGame').mousePressed(()=>{
    shiftPage('#page2')
    showQ()

   })
   // vi valt html ele med id question og
     // chakc asdwd me argumte true
  select('#trueBtn').mousePressed(()=>checkAnswer(true))
  select('#falseBtn').mousePressed(()=>checkAnswer(false))
}


function showQ(){
  // vi valt html ele med id question og
  // insæyty første ojkedt "spørgsmål" i den
  select("#question").html(questions[q].spørgsmål)

}

function showQ(){
  // vi valt html ele med id question og
  // insæyty første ojkedt "spørgsmål" i den
  select("#question").html(questions[q].spørgsmål)

}



function checkAnswer(bool){
  if(questions[q].svar == bool){
    score++
    }q++
  if(questions.length == q){
    select('#result').html(`yay ,du fike ${score} point ud af ${questions.length}`)
    shiftPage('#page3')
    return

  }
  showQ()

}
    

function resetGame(){
  select('#restartBtn').mousePressed(()=>{
    shiftPage('#page1')
    clearInterval(score)
    
  })
}
  





function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}