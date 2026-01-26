var currentPage = '#page1'

// Array med filnavne på vores billeder - hvert billede står der to gange så vi kan få par
var images = [
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg",
    "assets/bambirhino.jpg", "assets/cropcoptub.jpg", "assets/dogtiger.jpg", "assets/elephorse.jpg",
    "assets/foxmockingbird.jpg", "assets/hamsterfinger.jpg", "assets/owlbear.jpg", "assets/rhinelephant.jpg",
    "assets/sealhorse.jpg", "assets/zeacat.jpg"
]



var flippedCard =[

]

function setup(){
    noCanvas() // Vi bruger HTML elementer, så vi behøver ikke et canvas   
    shiftPage(currentPage) // Skift til startsiden
    select('#startGame').mousePressed(()=>{
        setupGame()
    })
}

function setupGame(){
    //lad blad kortne
    images = shuffle((images))//shuffle tage liige eleamdt bland redome 
    //console.log(images)
    images.map( i =>{
        //DOM binding til spillContasdn
        var container = select('#gameContainer')
        //opret spillkoret div ,

        var card = createElement('div').addClass('card').attribute('img-source',i).parent(container).child(createImg(i)).mousePressed(()=>{
            if(flippedCard.length < 2){
                card.addClass('show')
                flippedCard.push(card)
                if(flippedCard.length == 2){
                    //hvis der to kort i flippercarer skal vi tjekk match
                    console.log(flippedCard)
                    if(flippedCard[0].attribute('img-source') === flippedCard[1].attribute('img-source')){
                        //vi har et match
                        flippedCard[0].addClass('checked')
                         flippedCard[1].addClass('checked')
                         flippedCard = []
                    }else{
                        setTimeout(() =>{
                        flippedCard[0].removeClass('show')
                        flippedCard[1].removeClass('show')
                        flippedCard = []

                        }, 2000) //vent 2 skueder før kortene vendet igen
                        
                    }
                }

            }
            

        })
         

    })
    shiftPage('#page2')

}

// Funktion til at skifte mellem sider (skjuler den gamle, viser den nye)
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
