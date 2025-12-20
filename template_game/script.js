// we sleect the gamecontaner from html - and save it 
var game_container = document.querySelector('#game-container')

// the fucfer take a asta div elemet as argumet and remove from its parent container
function KillAsta(asta) {
    game_container.removeChild(asta)
}
// ste the timer it dos sotni in javascrip intasdi run funsdaf ever intefas
//in this case we use the funcaf to make new img elmeadx indsd the gamcontadn
setInterval(()=>{
    //vi laver et img element i variavblen new_asta
    var new_asta = document.createElement('img')
    new_asta.src = 'assets/asta 1.png'
    //we add  a callssname to it so we can style it 
    new_asta.className= 'asta'
    //we put the new img elment inside the game cotainern
    game_container.appendChild(new_asta)
    //when we click the new img element we call the KillAtsa function which removes it
    new_asta.addEventListener('click', ()=>{KillAsta(new_asta)} )
},1250 )

