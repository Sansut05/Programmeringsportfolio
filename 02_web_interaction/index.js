var currentPage = '#page4'


function setup(){
    console. log('P5 setup kaldt ')
 //hent all side som et array
 shiftPage(currentPage)

 //buttons
 var theButton = select('#theButton')
 //sæt en event listerer op på knappen
 theButton.mousePressed( ()=>{
    if( confirm('er du sikker')){
        theButton.html('i was clicked')
    

    }else{
        theButton.html('i am not sure who i am')
    }
 } )

 //drop dows
 var theDropdown = select('#theDropdown')
// event listener: changed
theDropdown.changed(()=>{
    select('#page2').style('background-color',theDropdown.value())
})

//Input field
var theInput = select('#theInput')
var theInputBotton = select('#theInputButton')
var theInputTitle = select('#theInputTitle')
theInputBotton.mousePressed(()=>{
    //giv mig det som står i input feltet ind i variblen title
    var title = theInput.value()
    theInput.hide()
    theInputBotton.hide()
    theInputTitle.html(title)
    
})
//check boxe
var ck = select('#ck1')
ck.changed(()=>{
    ck.hide()
    select('#ckl').hide()
    select('#reble').html("død over opøre")


})



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

