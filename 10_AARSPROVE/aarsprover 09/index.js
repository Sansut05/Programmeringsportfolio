

var currentpage = '#page1'
var deck={
    cards: [],
    total: 0
}


function setup(){
    currentPage = '#page1'

    getDeck()

    select('#DrawBnt').mousePressed(()=>{
        drawCard()
    })
   
}


async function getDeck() {
    try { 
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        
        if (response.ok) {
            const data = await response.json()
            
            console.log("Data vi får tilbage: ", data)
            deck = data
            console.log(deck)
            drawCard()

        }
    } catch (error) {
        console.log(error)
    }
}


 function drawCard(){
visCards()      
    }


    
async function visCards(){
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
    if(response.ok){
        const data = await response.json()
        console.log("data vi får tilbage",data)
        returnCardValue(data.cards[0])
        console.log("værdi af kortet", returnCardValue(data.cards[0]))
        console.log("er det et billedkort?", isNaN(data.cards[0].value))
        console.log("det er en ", (data.cards[0].suit) )
        returnCardValue(data.cards[1])
        console.log("værdi af kortet", returnCardValue(data.cards[1]))
        console.log("er det et billedkort?", isNaN(data.cards[1].value))
        console.log("det er en ", (data.cards[1].suit) )
        
    }}




function returnCardValue(card) {
    if (isNaN(card.value)) {
        if (card.value == "ACE") {
            return 11
        } else {
            return 10
        }
    } else {
        return Number(card.value)
    }
}