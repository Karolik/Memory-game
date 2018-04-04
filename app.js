// Defining the variables
const deck = document.querySelector('.deck');
//const moves;
//const stars;
//const time;

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

//function to restart the game

function initialize(){
    shuffle(cards);

    const restart = document.querySelector('.restart');
    restart.click(function initialize(){
        return this;
      });

    //Loop through each card and create its HTML;  - Add each card's HTML to the page (Store the HTML in a string)
    let cardGrid = "";
    for(const card of cards) {
        cardGrid += '<li class="card"><i class="'+card+'"></i></li>'; 
    }
    deck.insertAdjacentHTML('afterbegin', cardGrid); 
}
window.onload = initialize();

/* event listener - a card is clicked -display the card's symbol (put this functionality in another function that you call from this one) */
//const card = document.getElementsByClassName('card');

function showCards(event) {
    event.target.classList.add('show','open');
};
//deck.addEventListener('click', showCards);

function matchCards(event) {
    event.target.classList.add('match');
};

function hideCards(event){
    event.target.classList.remove('show','open');
};

//add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
let openCards = [];
/*function addToOpenCards(event){
    if (event.target.classList.contains('show','open')){
        openCards.push(event.target); //add an element to an array
    }
}; */

//if the list already has another card, check to see if the two cards match
function tracker(event){
    if (openCards.length > 0) {
        if(openCards.length === 1){
            showCards(event);
            openCards.push(event.target);
        }
        else if(openCards.length===2 && openCards.firstElementChild === openCards.lastElementChild){     //if the cards do match, lock the cards in the open position
            matchCards(event);
            openCards = [];                        //remove the cards from the list
            //openCards.splice(0,2);
        }
        else if(openCards.length===2 && openCards.firstElementChild !== openCards.lastElementChild) {
            hideCards(event);                           //if the cards do not match, hide the card's symbol
            openCards = [];                  
        }
    }
    else if(openCards.length == 0) {
        showCards(event);
        openCards.push(event.target);
    }
};
deck.addEventListener('click', tracker);
