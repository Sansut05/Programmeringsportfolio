let data = [
  { name: "A", sleep: "7", breaks: "3" },
  { name: "B", sleep: "", breaks: "2" },
  { name: "C", sleep: "8", breaks: "not known" }
]


function setup() {
    var result = data.map(d => {
    var sleep =Number(d.sleep)
    var breaks = Number(d.breaks)
    if(!isNaN(sleep) && !isNaN(breaks)){
    return {sleep,breaks}
    console.log(data,"both are NaN")

    }
    console.log(data,"one of them is NaN")
}).filter(d => d)
console.log(result,"data efter map og filter")

}

