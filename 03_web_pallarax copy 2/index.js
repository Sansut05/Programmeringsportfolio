var currentPage = '#page4'
var capture 
var otterSound, rainSound
var recBtn, recorder, AudioFile 
var isRecording = false
var speakInp, speakBtn

function preload(){
  
    
}

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

   


    //SOUND 
    select('#otter').mousePressed(()=>{
        otterSound.play()
        fireGif = createImg('./assets/fire.gif')
        select('#page2').child(fireGif)
        var pos = select('#otter').position()
        console.log(pos)
        fireGif.position(pos.x,pos.y)

        var pos = select('#otter').position()
        console.log(pos)
        fireGif.position(pos.x,pos.y)
        select('#otter').hide()
        otterSound.play
    })

    rainSound = createAudio("./assets/to be bee nomalt.mp3")
    rainSound.showControls()
    select('#page2').child(rainSound)
    rainSound.play()



    // lyde optalse
    // star bows micorefon
    var mic = new p5.AudioIn()
    mic.start()
    // opret en ny file at gemmmer lyd i
    audioFile = new p5.SoundFile()

    recorder = new p5.SoundRecorder()
    recorder.setInput(mic)

    recBtn = select('#recBtn')

    recBtn.mousePressed(()=>{
        if(!isRecording){
          recorder.record(audioFile)
          isRecording = true
          recBtn.html('STOP recording')
        }else{
            recorder.stop()
            isRecording = false
            recBtn.html('start recording')
            setTimeout(() => {
                 audioFile.play()
                 save(audioFile, "myVoce.wav")
            }, 200);
            
            
        }
    })

    //speech syth
    speakInp = select('#speakMe')
    speakBtn = select('#speakBtn')

    speakBtn.mousePressed(()=>{
        const utterance = new SpeechSynthesisUtterance(speakInp.value())
        utterance.lang = "ur-PK"
        utterance.rate = 1.4
        utterance.pitch = 1.4
        speechSynthesis.speak(utterance)

    })

    
    //Sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem en for en 
    allPages.map(
       page => {
        //Lav et nyt <a> element 
        var menuItem = createElement('a')
        //Sæt a taggets html til sidens titel
        menuItem.html(page.attribute('title'))
        //sæt eventlistener på a tagget
        menuItem.mousePressed(
            () => shiftPage('#' + page.attribute('id'))
        )
        //sæt a tagget ind i sidebaren
        select('.sidebar').child(menuItem)
       }
    )

}
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}