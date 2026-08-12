var currentPage = '#page1'



function preload(){
  
    
}

function setup(){
    var scores = [
  { name: "Rikke", seconds: 42 },
  { name: "Peter", seconds: 55 },
  { name: "Zenia", seconds: 38 }
]

    console.log(scores.length, "scores i arrayet")


    scores.push({ name: "Ludvig", seconds: 45 })
    console.log(scores.length, "scores i arrayet efter push")
    console.log(scores[0], 'er den første i listen')

    scores.map(score => {
        console.log(score.name, "score name")
        console.log(score.seconds, "score seconds")
        sortedScores = scores.sort((a, b) => a.seconds - b.seconds)
        console.log(sortedScores, "sorted scores")
    })

}
