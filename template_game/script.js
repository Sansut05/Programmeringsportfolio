// we sleect the gamecontaner from html - and save it 
var game_container = document.querySelector('#game-container')
var points_display = document.querySelector('#points-display')
var time_display = document.querySelector('#time-display')
var timeout = 2000
var points = 0
var time_left = 10
// the fucfer take a asta div elemet as argumet and remove from its parent container
function KillAsta(asta) {
    game_container.removeChild(asta)
    points += 5
    points_display.textContent = points
    SpawnAsta()
}

function TimeoutAsta(asta) {
    if (game_container.contains(asta)) {
    game_container.removeChild(asta)
    points -= 2
    points_display.textContent = points
    SpawnAsta()

    }
   
}


// ste the timer it dos sotni in javascrip intasdi run funsdaf ever intefas
//in this case we use the funcaf to make new img elmeadx indsd the gamcontadn
function SpawnAsta(){
    //vi laver et img element i variavblen new_asta
    var new_asta = document.createElement('img')
    var top = Math.random() * 90
    var left = Math.random() * 90
    new_asta.style = `left: ${left}%; top: ${top}%;`
    new_asta.src = 'assets/asta 1.png'
    //we add  a callssname to it so we can style it 
    new_asta.className= 'asta'
    //we put the new img elment inside the game cotainern
    game_container.appendChild(new_asta)
    //when we click the new img element we call the KillAtsa function which removes it
    new_asta.addEventListener('click', ()=>{KillAsta(new_asta)} )
    setTimeout(() =>{ TimeoutAsta(new_asta) }, timeout)
}

setInterval(() => {
    time_left -= 1
    time_display.textContent = time_left
    if(time_left == 0) {
        confirm(` you got ${points} points!`)
        location.reload()
    }

}, 1000)

 time_display.textContent = time_left
 points_display.textContent = points
SpawnAsta()
