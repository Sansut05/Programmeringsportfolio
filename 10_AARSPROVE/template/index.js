// ============================================
// STATE
// ============================================
var currentPage = '#start'
var gameState = 0
var timerInterval = null
var seconds = 0


// Rum 1: antal fundne symboler
var symbolsFound = 0

var throneClicked = false
// Firestore reference
var scoresRef = db.collection('highscores')

// ============================================
// SETUP — kaldes én gang af p5.js
// ============================================
function setup() {
    noCanvas()
    shiftPage('#start')
    loadHighScores()
    //var symbolsActive = symbols.map(symbolsActive => false)

    // ---- STARTSIDE ----
    select('#btn-start').mousePressed(() => {
        startGame()
    })

    // ---- RUM 1: Hotspots på søjler ----
    select('#room1 #symbol1').mousePressed(() => findSymbol('#room1 #symbol1'))
    select('#room1 #symbol2').mousePressed(() => findSymbol('#room1 #symbol2'))
    select('#room1 #symbol3').mousePressed(() => findSymbol('#room1 #symbol3'))
    select('#room1 #symbol4').mousePressed(() => findSymbol('#room1 #symbol4'))
    select('#room1 #symbol5').mousePressed(() => findSymbol('#room1 #symbol5'))
    select('#room1 #symbol6').mousePressed(() => findSymbol('#room1 #symbol6'))
    select('#room3 #symbol7').mousePressed(() => findSymbol('#room3 #symbol7'))
    select('#room3 #symbol8').mousePressed(() => findSymbol('#room3 #symbol8'))
    select('#room3 #symbol9').mousePressed(() => findSymbol('#room3 #symbol9'))


    //rum 2: dør
    select('#room2 #room2-submit').mousePressed(() => {
        checkRoom2Answer()
    })

    // ---- SLUTSIDE ----
    select('#btn-save').mousePressed(() => {
        saveHighScore()
    })

    select('#btn-restart').mousePressed(() => {
        resetGame()
    })
  select('#btn-restart-end').mousePressed(() => {
        resetGame()
    })  
}

// ============================================
// SHIFTPAGE — skifter mellem rum/sider
// ============================================
function shiftPage(newPage) {
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
    if(currentPage == '#taber') {
        stopTimer()
      
    }
}

// ============================================
// TIMER — tæller 1 op hvert sekund
// ============================================
//tæller ned hvert sekund 
function startTimer() {

    seconds = 120

    timerInterval = setInterval(() => {

        seconds--

        select('#timer').html(seconds + ' sek')

        stopGamer()

    }, 1000)

}

function stopTimer() {
   
    clearInterval(timerInterval)
}

function stopGamer() {

    console.log(seconds)

    if (seconds <= 0) {

        console.log("DU TABTE")

        stopTimer()

        shiftPage('#taber')

    }

}

// Symbolernes status fra start, false=slukket
var active = {

    symbol10:false,
    symbol11:false,
    symbol12:false,
    symbol13:false,
    symbol14:false,
    symbol15:false,
    symbol16:false,
    symbol17:false
};

// Når spilleren klikker så skifter de enkelte symboler status efter et bestemt mønster
function clickSymbol(id){

    if(id == 'symbol10'){

        toggle('symbol10');
        toggle('symbol11');
    }

    if(id == 'symbol11'){

        toggle('symbol11');
        toggle('symbol12');
    }

    if(id == 'symbol12'){

        toggle('symbol12');
        toggle('symbol13');
    }

    if(id == 'symbol13'){

        toggle('symbol13');
        toggle('symbol14');
    }

    if(id == 'symbol14'){

        toggle('symbol14');
        toggle('symbol15');
    }

    if(id == 'symbol15'){

        toggle('symbol15');
        toggle('symbol16');
    }

    if(id == 'symbol16'){

        toggle('symbol16');
        toggle('symbol17');
    }

    if(id == 'symbol17'){

        toggle('symbol17');
        toggle('symbol10');
    }

    checkAllSymbols();
}

// skifter symbolernes status mellem tændt ogslukket 
function toggle(id){

    active[id] = !active[id];

    // FIND HTML ELEMENT
    let symbol = select('#' + id);

    // HVIS AKTIV
    if(active[id]){

        symbol.addClass('active');

    }else{

        symbol.removeClass('active');
    }
}

// Tjekker om alle symboler er tændte
function checkAllSymbols(){

    if(
        active.symbol10 &&
        active.symbol11 &&
        active.symbol12 &&
        active.symbol13 &&
        active.symbol14 &&
        active.symbol15 &&
        active.symbol16 &&
        active.symbol17
    ){
        
        setTimeout(() => {
            select('#room2 #room2-code').addClass('show')
        }, 1500);
    }
}

// ============================================
// START SPIL
// ============================================
// skal start tim til 3 minutt
function startGame() {
    gameState = 0
    symbolsFound = 0
    
    startTimer()
    shiftPage('#room1')
}

// ============================================
// RUM 1: FIND DEN RIGTIGE SYMBOL PÅ SØJLE ELLERS MISTER MAN TID
// ============================================

function findSymbol(id) {
    select(id).hide()
    if(id.includes('symbol1')) {
        console.log("Du fandt det rigtige symbol! +5 sekunder")
        seconds += 5
        shiftPage('#room3')
    }else if(id.includes('symbol8')) {
        console.log("Du fandt det rigtige symbol! +5 sekunder")
        seconds += 5
        shiftPage('#room4')
    }else{
        seconds -= 5
        console.log("Forkert symbol! -5 sekunder")}
    symbolsFound++
 
}
document.getElementById("sitButton").addEventListener("click", function(){

    console.log("Du sætter dig på tronen")
    shiftPage('#taber')


})

document.getElementById("leaveButton").addEventListener("click", function(){

    console.log("Du går videre")
        shiftPage('#room2')

})

// ============================================
// RUM 2: CHECK GÅDE OG AFSLUT SPILLET
// ============================================

function checkRoom2Answer() {
    var answer = select('#room2 #room2-answer').value().toLowerCase()
    if (answer.includes('porten')) {
        gameState = 2
        stopTimer()
        select('#final-time').html('Din tid: ' + (120 - seconds) + ' sekunder')
        shiftPage('#complete')
    } else {
        select('#room2 #room2-error').html('Ikke helt - prøv igen!')
    }
}

// ============================================
// HIGH SCORE (Firestore)
// ============================================
function loadHighScores() {
    scoresRef.orderBy('seconds', 'asc').limit(10).onSnapshot(snap => {
        select('#score-list').html('')
        snap.forEach(doc => {
            var d = doc.data()
            var li = createElement('li')
            li.child(createElement('span', d.name))
            li.child(createElement('span', d.seconds + ' sek'))
            select('#score-list').child(li)
        })
    })
}

function saveHighScore() {
    var name = select('#player-name').value().trim()
    if (name === '') {
        select('#player-name').attribute('placeholder', 'Skriv dit navn først!')
        return
    }
    console.log('Du trykkede Gem! Navn:', name, '— Tid:', 120 - seconds, 'sek')
    console.log('TODO: Åbn firebase.js og indsæt jeres Firebase-config. Derefter virker scoresRef.add() og gemmer data i Firestore.')

    //Udkommenter linjen herunder når firebase.js er sat op:
    scoresRef.add({ name: name, seconds: 120 - seconds }).then(() => {
        select('#btn-save').attribute('disabled', true)
         select('#btn-save').html('Gemt!')
     })
}

// ============================================
// RESET
// ============================================
function resetGame() {
    select('#timer').html('0 sek')

    // Nulstil rum 1
  
    select('#room1 #symbol1').show()
    select('#room1 #symbol2').show()
    select('#room1 #symbol3').show()
    select('#room3 #symbol8').show()
    select('#room3 #symbol9').show()
    select('#room3 #symbol7').show()

    // Nulstil rum 2
    select('#room2 #room2-code').removeClass('show')
    select('#room2 #room2-answer').value('')
    select('#room2 #room2-error').html('')
    selectAll("#room2 .hotspot").forEach(el => el.removeClass('active'))
    Object.keys(active).forEach((el) => active[el] = false)

    // Nulstil slutside
    select('#btn-save').removeAttribute('disabled')
    select('#btn-save').html('Gem high score')
    select('#player-name').value('')

    shiftPage('#start')
}