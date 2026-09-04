var client 
var topic = "karaktervalg"
function setup() {
    // Bind controllerens knapper og send handlinger over MQTT her.

    select('#PlayerA').mousePressed(()=>choosePlayer('A'))
    

     client = mqtt.connect('wss://mqtt.nextservices.dk')
    client.on('connect', ()=>{
        showToast('forbunt tiil mqtt')
        client.subscribe(topic)
    })
    client.on('message', (topic, ms) => {
        showToast(`modto bese:${ms.toString()}`)
        var msObject = JSON.parse(ms.toString())
        console.lof(msObject.name)
    })
}
function choosePlayer(){
   
}
