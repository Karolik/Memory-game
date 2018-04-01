/*
 * Create a list that holds all of your cards
 */
 const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb", "fa fa-anchor", "fa fa-anchor" ]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 // Shuffle function from http://stackoverflow.com/a/2450976
 
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(cards);

//Loop through each card and create its HTML;  - Add each card's HTML to the page
//Store the HTML in a string

let cardGrid = "";

for(const card of cards) {
    cardGrid += '<li class="card"><i class="'+card+'"></i></li>'; 
}

const deck = document.querySelector('.deck');
deck.insertAdjacentHTML('afterbegin', cardGrid);


/* event listener - a card is clicked -display the card's symbol (put this functionality in another function that you call from this one) */

function addClassShow() {
   cards.classList.add("show");
}
for (let i = 0 ; i < cards.length; i++) {
  cards[i].addEventListener('click' , addClassShow()) ; 
  }



//function to restart the game

function initialize(){
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }
    shuffle(cards);

    const restart = document.querySelector('.restart');
    restart.click(function initialize(){
        return this;
      });

    //add cards to the page
    let cardGrid = "";
    for(const card of cards) {
        cardGrid += '<li class="card"><i class="'+card+'"></i></li>'; 
    }
    const deck = document.querySelector('.deck');
    deck.insertAdjacentHTML('afterbegin', cardGrid);
  
}

