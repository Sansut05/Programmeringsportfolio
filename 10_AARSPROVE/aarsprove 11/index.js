var currentPage = '#page1'
var speakInp, speakBtn


function setup(){
      speakInp = select('#speak')
    speakBtn = select('#speakBtn')

    speakBtn.mousePressed(()=>{
        const utterance = new SpeechSynthesisUtterance(speakInp.value())
        utterance.lang = "ur-PK"
        utterance.rate = 1.4
        utterance.pitch = 1.4
        speechSynthesis.speak(utterance)

    })

}