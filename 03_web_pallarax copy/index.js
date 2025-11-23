var currentPage = '#page1'
var capture


function setup(){
    console. log('P5 setup kaldt ')
 //hent all side som et array
 shiftPage(currentPage)

 capture = createCapture(VIDEO, {flipped:true})
 capture.size(720,468)
 select('#page1').child(capture)

 


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

