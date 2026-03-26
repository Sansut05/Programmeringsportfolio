
var testRef = db.collection('test')
console.log("oprett refa til test")







//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //nu kommer det genialer : onsnapshot
    testRef.onSnapshot( snap =>{
        console.log("motai snap", snap.size)
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
        })
    })
}

