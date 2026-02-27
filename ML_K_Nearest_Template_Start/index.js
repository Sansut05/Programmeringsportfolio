// ------------------------------------------------------------------
// UNDERVISNINGS-MANUSKRIPT: ML & KNN (Chart.js Version)
// ------------------------------------------------------------------
// MÅL FOR TIMEN:
// 1. Indlæse data fra CSV
// 2. Rense data og konvertere til objekter
// 3. Visualisere data med Chart.js (Scatter plot)
// 4. Implementere KNN algoritmen (Afstand, Sortering, Afgørelse)
// ------------------------------------------------------------------

// -------------------------------------------------------------
// TRIN 1: GLOBALE VARIABLER OG INDSTILLINGER
// (Start her: Vi skal definere hvad vores program skal kunne huske)
// -------------------------------------------------------------
var table           // Her gemmer vi den rå CSV fil fra p5's loadTable
var data = []       // Her gemmer vi vores rensede data (objekter med x, y, label)
var myChart         // Her gemmer vi selve graf-objektet fra Chart.js

// INDSTILLINGER FOR DATA
var filename = './assets/penguins.csv'
var colX = "bill_length_mm"     // X-aksen: Variabel 1 (input)
var colY = "bill_depth_mm"      // Y-aksen: Variabel 2 (input)
var colLabel = "species" // Facit: Hvilken gruppe hører man til?

// GUI Overskrifter (Gør det pænt for brugeren)
var mainTitle = "species Predictor"
var sectionTitle1 = "1. Indtast dine tal"
var instructionText = "bill_length_mm og bill_depth_mm:"
var sectionTitle2 = "2. Se Resultat i Grafen"

// Farver til vores grupper (Labels) - Chart.js bruger disse
var colorList = ['red', 'green', 'blue', 'orange', 'purple', 'cyan', 'magenta', 'teal']

function preload() {
    // Indlæs data fil før programmet starter
    table = loadTable(filename, 'csv', 'header')
}

function setup() {
    // 0. SÆT TITLER I HTML
    select('#main-header').html(mainTitle)
    select('#section-1-title').html(sectionTitle1)
    select('#instruction-text').html(instructionText)
    select('#section-2-title').html(sectionTitle2)
    select('#label-x').html(colX)
    select('#label-y').html(colY)

    // -------------------------------------------------------------
    // TRIN 2: RENS DATA
    // (Forklar: Vi konverterer tekst-rækker til rigtige Javascript-objekter)
    // -------------------------------------------------------------
    var rows = table.rows
    rows = shuffle(rows).slice(0, 1000) // Vi begrænser til 1000 punkter for hastighedens skyld
    console.log("rene rows", rows)
    data = rows.map(row => {
        // Hent værdier fra de kolonner vi valgte i toppen
        // HUSK: Alt fra CSV er tekst, så vi bruger Number() til tallene
        var x = Number(row.get(colX))
        var y = Number(row.get(colY))
        var label = row.get(colLabel)
        
        // Tjek om data er gyldig (ikke NaN og har en label)
        if (!isNaN(x) && !isNaN(y) && label) {
            return { x, y, label }
        }
    }).filter(p => p) // Fjern tomme pladser i arrayet

    console.log("Data klar:", data.length, "punkter")
    console.log(data)



    // nu skal vi forber data til at blive vist med chart.js
    // vi skal have fat i de unikke labels for hver gruppe i data
    var uniqueLabels = []
    data.map(point => {
        //vi kigge på ponte laber. hvis vi ikke har set det før så må det unkey
        if(!uniqueLabels.includes(point.label)){
            uniqueLabels.push(point.label)
        }
    } )
    console.log('vi kygge og fat ', uniqueLabels)
    // man kunne sorte labels alfabeysd
    //uniqueLabels.sort()

    // omda data tiil grupper ud de forskadl label
    var datasets = uniqueLabels.map( (label, index) =>{
        //Filter fuknesd giver os en gruppe med et besde lanbkel
        var groupData = data.filter( point => {
           return point.label == label
        })
        var col = colorList[index]


        // retuner den fædeid groupe med alla daapukel for hver label
        return {
            label:label,
            data: groupData,
            backgroundColor: col,
            pointRadius: 5,
            pointHoverRadius: 8


        }
    })


    //nu indsætter vi et enkely dataset med brugerens gæt
    datasets.push({
        label: "dit gæt",
        data: [{x:0,y:0}],
        pointStyle:"crossRot",
        pointRadius: 12,
        backgroundColor:'black',
        borderColor: 'black',
        borderWidth: 4

    })
    console.log(' så fiker vi laver datasate gruppper', datasets)

    //vi vil nu oprette gafen med chart.js
    const canvasChart = document.getElementById('chartCanvas')
    // så kommer vi til noget lidt objektorienteret
    myChart = new Chart(canvasChart, {
        //scatter er et punkidiardram i 2d (x,y)
        type: 'scatter',
        data: {datasets:datasets},
        options:{
            //scales styrer hvad x og y akse
            scales:{
                x:{title:{display:true,text:colX}},
                y:{title:{display:true,text:colY}}
            }
        }


    })


    setupControls()
}

function setupControls() {
    //1) find all x og y værdil i data
    // fordo vi skal bruge 
    var xValues = data.map(point => point.x)
    //det her beytdsi map data sargeh og runds6tda all point.x vøredsfd
    var yValues = data.map(point => point.y)
    //berger minsdwe og støeref værdsai
    var minX = Math.min(...xValues)
   var maxX = Math.max(...xValues)
   var minY = Math.min(...yValues)
   var maxY = Math.max(...yValues)
    console.log( 'her er min og max', maxX, minY, maxY, minX)

    var xSlider = select("#input-x")
    var ySlider = select("#input-y")

    xSlider.attribute('min', Math.floor(minX))
    xSlider.attribute('max', Math.ceil(maxX))
     xSlider.attribute('step', (maxX-minX )/100)
    xSlider.value(minX + maxX / 2)
    //gør det smaa
    ySlider.attribute('min', Math.floor(minY))
    ySlider.attribute('max', Math.ceil(maxY))
    ySlider.attribute('step', (maxY-minY )/100)
    ySlider.value(minY + maxY / 2)

    //input s
    xSlider.input(() => select('#val-x').html(xSlider.value()))
    ySlider.input(() => select('#val-y').html(ySlider.value()))

    select('#val-x').html(xSlider.value())
    select('#val-y').html(ySlider.value())

    var kSlider = select('#k-slider')

    kSlider.input(()=> select('#k-value').html(select('#k-slider').value()))





    select('#predict-btn').mousePressed(classifyUnknown)

}

function classifyUnknown(){
      //Aflæs værdierne fra sliderne og gem dem i to variabler 
      var inputX = select('#input-x').value()
       var inputY = select('#input-y').value()

    //Indsæt punktet fra sliderne i grafen
    var guessDataset = myChart.data.datasets[myChart.data.datasets.length - 1]
    guessDataset.data = [{x:inputX, y: inputY}]
    myChart.update()
    console.log(inputX, inputY)


    //Løb data igennem - altså ALLE datapunkterne - og find hver og ens afstand til vores gæt
    data = data.map( p => {
        //dist ligger i p5.js og den laver pythagoras for os 
        p.distance = dist(inputX,inputY, p.x,p.y)
        return p
    })
    //console.log(data)

    //Så sorterer vi dem så dem med mindst afstand til gættet kommer først
    //sort a,b tag hver punket 
    data.sort((a,b) => a.distance -b.distance)



    //Spørg de [k] nærmeste hvilken gruppe de hører til 
    var k = select('#k-slider').value()
    //neighbours
    var neighbours = data.slice(0, k)


    //De stemmer om resultatet og vinderen er fundet 
    var votes = {}
    neighbours.map( n  => {
        if(votes[n.label] === undefined){
            votes[n.label] = 0
        }
        votes[n.label] += 1
    })

    console.log(votes, 'her er ')

    var allLabels = Object.keys(votes)


    var Winner = allLabels[0]


    //
    allLabels.map( l => {
        if(votes[l] > votes[Winner]){
            Winner = l
        }
    })

    //Vis i resultat feltet hvilken klasse gætte tilhører 

    console.log('og winnd', Winner)

    select('#Winner').html(Winner)

}

