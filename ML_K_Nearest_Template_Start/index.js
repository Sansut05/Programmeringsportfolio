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
var filename = './assets/dating_app_behavior_dataset.csv'
var colX = "swipe_right_ratio"     // X-aksen: Variabel 1 (input)
var colY = "app_usage_time_min"      // Y-aksen: Variabel 2 (input)
var colLabel =  "gender" // Facit: Hvilken gruppe hører man til?

// GUI Overskrifter (Gør det pænt for brugeren)
var mainTitle = "gender Predictor"
var sectionTitle1 = "1. Indtast dine tal"
var instructionText = "swipe_right_ratio og app_usage_time_min:"
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



}

