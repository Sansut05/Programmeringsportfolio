//array med alle rick and morty karaktererne
var chars = []
//mqtt wket takk 
var client
//
var topic = "karaktervalg"
function setup() {
    // Hent kataloget, lyt på MQTT og opdatér fællesskærmen her.
    getChars()
    //init mqtt
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

async function getChars(){
   var chars =  await getJSON('https://rickandmortyapi.com/api/character?page=1')
   showChars(chars.results)
}


function showChars(chars){
    chars.map(c =>{
      var card = createCard( c.name, c.species, c.image)
      select('#characters').child(card)
    })

}