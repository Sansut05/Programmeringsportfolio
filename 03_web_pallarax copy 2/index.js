var currentPage = '#page4'
var capture 
var otterSound, rainSound
var recBtn, recorder, AudioFile 
var isRecording = false
var speakInp, speakBtn
var listeInput, listeHeader, listeButton, listeContainer
var removeListe 
const fugle = [
  "solsort","musvit","blåmejse","skovspurv","gråspurv","bogfinke","grønirisk",
  "stillits","dompap","gærdesmutte","rødhals","sjagger","ringdue","bydue",
  "hættemåge","sildemåge","svartbag","stormmåge","gråkrage","råge","allike",
  "skade","husskade","nøddekrige","hærfugl","isfugl","svalehale","landsvale",
  "bysvale","digesvale","tornsanger","munk","gransanger","løvsanger",
  "rørsanger","sivsanger","havesanger","gulspurv","rørspurv","snespurv",
  "korttået lærke","sanglærke","toplærke","bomlærke","piber","engpiber",
  "skovpiber","bjergpiber","hvid vipstjert","gul vipstjert","citronvipstjert",
  "vintergærdesmutte","sortstrubet bynkefugl","stenskvæt","buskskvæt",
  "sortstrubet bynkefugl","nattergal","blåhals","rødstjert","husrødstjert",
  "broget fluesnapper","grå fluesnapper","lille fluesnapper",
  "sortmejse","topmejse","sortstrubet mejse","fyrremejse","sumpmejse",
  "skægmejse","halemejse","pirol","silkehale","tornirisk","bjergirisk",
  "lille korsnæb","stor korsnæb","hvidvinget korsnæb","kernebider",
  "spurvehøg","duehøg","musvåge","fjeldvåge","hvepsevåge","rørhøg",
  "blå kærhøg","rød glente","sort glente","havørn","kongeørn",
  "tårnfalk","lærkefalk","jagtfalk","vandrefalk","slørugle",
  "natugle","skovhornugle","hornugle","kirkeugle","spurveugle",
  "perleugle","hjejle","stor regnspove","lille regnspove","brushane",
  "rødben","sortklire","grønbenet rørhøne","hvidklire","mudderklire",
  "dobbeltbekkasin","enkeltbekkasin","tinksmed","klyde","præstekrave",
  "stor præstekrave","hjejle","strandskade","tejst","alk","lomvie",
  "søkonge","lunde","skarv","topskarv","silkehejre","fiskehejre",
  "rørdrum","sort stork","hvid stork","trane","blishøne","vandrikse",
  "rørhøne","knopsvane","sangsvane","pibesvane","gråand","krikand",
  "skeand","spidsand","atlingand","hvinand","troldand","toppet skallesluger",
  "lille skallesluger","stor skallesluger","ederfugl","havlit",
  "sortand","fløjlsand","bjergand","kongeederfugl","rødhalset lom",
  "sortstrubet lom","hvidnæbbet lom"
]
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
       createList(elemets, removeListe, 'elev',  removeListItem)

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
   //page4 -filste suft

   var  bridContainer = select('#bridContainer')
   var birdInp = select('#birdInp')
   createList(fugle, bridContainer, 'bird')
    birdInp.input(() =>{
       // console.log(birdInp.value())
      var filterBird = fugle.filter( f =>{
        return f.includes( birdInp.value())
        //er der ind i f (en eller anden fugl), det der er i input feltet????
      })
      // nu er det nye array filterBirds fyldt med fugle der indeholder bogstaver fra input felotet
      if(filterBird.length > 0){
        createList(filterBird, bridContainer, 'bird')
      }else{
        var feedback = createElement('h2', "bird nit")
        bridContainer.html("")
        bridContainer.child(feedback)
      }
      
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

function createList(list, dest, className, action){
    //førs søre 
    dest.html('')
    list.map((e, index) =>{
        var div = createDiv(e)
        div.addClass(className)

        if(action){
              div.mousePressed(() => {
            action(div, index, list)
        })
        }
        dest.child(div)

    })
    
}


function removeListItem(who, index, list){
    console.log('sebastians was call', who)
    who.style('background-image', `url("./assets/Foo_Fighters.jpg")`)
    setTimeout(()=>{
         list.splice(index, 1)
        createList(list, removeListe, 'elev', removeListItem)
    },800)
    
}