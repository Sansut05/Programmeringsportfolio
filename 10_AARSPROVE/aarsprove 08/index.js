var scoresRef = db.collection('scores')




function setup() {


scoresRef.add({
    name: 'selma',
    score: 1000,
    level: 5
})

scoresRef.add({
    name: 'silas',
    score: 2500,
    level: 7
})
}


scoresRef.onSnapshot(snap => {
    snap.forEach(doc => {
        var d = doc.data()
        console.log(d.name, d.score, d.level)
    })
})