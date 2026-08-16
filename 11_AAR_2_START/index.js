var client 

function setup(){
    //mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        toast.html('Forbundet til NEXT MQTT server')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, 2000)

    })

    client.subscribe('silas/page')
    client.subscribe('silas')

    client.on('message', (topic, msg) => {
        console.log(topic,msg)
        msg = msg.toString()
        if(topic.includes('page')){
            console.log('nu skal der skiftes side')
            //er det et tal
            msg = '#page' + msg
            shiftPage(msg)


        }

        
        if(topic == 'silas'){
            var toast = select('#toast2')
            toast.html(msg.toString())    // ← HER bliver beskeden til toast-tekst
            toast.addClass('toastShow')   // ← viser boksen
            setTimeout(() => {
            toast.removeClass('toastShow')
            console.log("kom silas med")
            },  5000)
           // select('#toast').elt.textContent = msg.toString()
        }
    })

    client.publish('programmering/page', '1')

}

var currentPage = "#page1"
var readyToShift = true
function shiftPage(newPage){
    if(readyToShift){
        if(!select(newPage))return
        select(currentPage).removeClass('show')
        currentPage = newPage
        select(currentPage).addClass('show')
        readyToShift = false
        setTimeout(()=> readyToShift = true, 5000)

    }

}