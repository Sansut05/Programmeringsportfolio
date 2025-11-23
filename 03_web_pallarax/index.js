var currentPage = '#page3'

var mouseX = 0
var mouseY = 0

function setup(){
    console. log('P5 setup kaldt ')
 //hent all side som et array
 shiftPage(currentPage)

 


 var allPages = selectAll('.page')
 //løb listen igemmen en for en 
    allPages.map(
        (page) => {
            //lave et ny <a> element
            var menuItem = createElement('a')
            // sæt a tagger html til sidne titel
            menuItem.html(page.attribute('title'))
            //sæt everlis på a tagger
            menuItem.mousePressed(
                () => shiftPage('#' + page.attribute('id'))
                
            )
            //sæt a tagger ind i sidebare
            select('.sidebar').child(menuItem)

     }
    )
}




function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}

document.addEventListener("mousemove", (e)=> {
    mouseX = e.clientY
    mouseY = e.clientY
    console.log(mouseX, mouseY)

    screenWidth = window.innerWidth
    screenHeight = window.innerHeight


    document.querySelectorAll(".parallax-mouse").forEach((elem) =>{
        elem.Style.transform = `translate(${mouseX - screenWidth / 2}px, ${mouseY - screenHeight / 2}px)`
    })
})
