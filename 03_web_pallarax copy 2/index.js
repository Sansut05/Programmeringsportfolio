var currentPage = '#page3'
var capture 
var otterSound, rainSound
var recBtn, recorder, AudioFile 
var isRecording = false
var speakInp, speakBtn
var listeInput, listeHeader, listeButton, listeContainer
var removeListe 
function preload(){
  
    
}

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

    // vi oprett er en 

    var klassen2T = ["asta", "selma", "silas", "mads", "viggo", "miilas"]

    //hvor mange 
    console.log(klassen2T.length, "elementer i lisster")

    console.log(klassen2T[0], 'er den første i listen')
    // sådan læge vi new ekal till
    klassen2T.push("toke")
    klassen2T.push("Lisbet")
    klassen2T.push("john")
    klassen2T.push("gilbert")
    klassen2T.push("floki")
    klassen2T.push("")
    klassen2T.push("ludvig")
    klassen2T.push("ludvig")
    



    console.log(klassen2T, klassen2T.length)

    //såden looper vi igemm et array

   

   

        //page 2 liste basice

        listeButton = select('#listeButton')
        listeHeader = select('#listerHeader')
        listeInput = select('#listeInput')
        listeContainer = select('#listeContainer')
        
        //der et input ffeld og en knap
       createList(klassen2T, listeContainer, 'elev')

       //page3 domm binding
       removeListe = select('#removeListe')
       // make a list
       var elemets = ["hest", "dog", "hamster", "php", "cangaroo", "fuck", "sebatian", "rat" ]
       //call the greneut 
       createList(elemets, removeListe, 'rapeVictim',  rape)

       listeButton.mousePressed(()=>{
        if(listeInput.value() ==''){
            confirm('du kan ikke')
        }else{
            klassen2T.push(listeInput.value())
            createElever(klassen2T, listeContainer)
            listeContainer.elt.scrollTop = listeContainer.elt.scrollHeight
        }
          listeInput.value('')
        })


       

        klassen2T.map(e => {
            console.log('den ' + e)


        })

    //SOUND 
   
    
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

function createList(list, dest, className, action){
    //førs søre 
    dest.html('')
    list.map(e =>{
        var div = createDiv(e)
        div.addClass('className')

        if(action){
              div.mousePressed(() => {
            action()
        })
        }
        dest.child(div)

    })
    
}


function rape(who){
    console.log('sebastians was call', who)
    who.style('background-image', url("/assets"))
}