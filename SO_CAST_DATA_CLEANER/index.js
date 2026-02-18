//this scripe takes a csv file  and clen the data into a javersro array

var table
//clean will hold the javerspreit objectre we intend to use
var cleanData = []


const csvFile = './assets/dating_app_behavior_dataset.csv'
//vi vil kun bruge tusdin rækker da vi skal ten
const maxRows = 1000

function preload(){
    //
    table = loadTable(csvFile, 'csv','header')
    console.log('data tabel loaded')
}

//kan jeg lave en algoret som kan forusing fokel køned ud fra dør tentnd dat?
function setup(){
    console.log("rå data kolonner:",table.columns)
    var xValue = "swipe_right_ratio"
    var yValue = "app_usage_time_min"
    var labelValue = "gender"
    // table.rows er et array med alle dat ojertern
    //map retuner et on
   cleanData = table.rows.map(row => {
    var x = row.get(xValue)
    var y = row.get(yValue)
    var returnObj = {
        [xValue]: Number(x),
        [yValue]: Number(y),

    }
    if(labelValue){
        returnObj.label = row.get(labelValue)
    }
    //console.log(returnObj)
    return returnObj

    // vi filter så liger arrayet sb 
   })
   cleanData = cleanData.filter( row => {
    var valid = !isNaN(row[xValue]) && !isNaN(row[yValue])
    //men vi skal også tjkkem om label ere noge hvis 
    if(labelValue && !row.label ){
        valid = false

        
    }
    return valid

   })

   cleanData = shuffle(cleanData)

   cleanData = cleanData.slice(0, maxRows)

   
   console.log('så har vi renser dat:', cleanData)

   select('#status').html('vi har nu renset dataen og skåret det ned til max rækker - kig i kon')


    
}



