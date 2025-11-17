var currentPage = '#Page5'
var videoButton, theVideo
var videoPlaying = true


function setup(){
    console. log('P5 setup kaldt ')
 //hent all side som et array
 shiftPage(currentPage)
//videoen
theVideo = select('#theVideo')
 // video control button 
 videoButton = select('#videoButton')
 videoButton.mousePressed(()=>{
    //console.log('button pressed')
    if(videoPlaying){
        theVideo.pause()
        videoPlaying = false

    }else{
        theVideo.play()
        videoPlaying = true
    }

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

