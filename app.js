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

function addClassShow(event) {
    event.target.classList.add('show','open');
};
//deck.addEventListener('click', addClassShow);

function addClassMatch(event) {
    event.target.classList.add('match');
};

function hideCards(event){
    event.target.classList.remove('show','open');
};

//add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
const openCardsList = [];
function addToOpenCardsList(event){
    if (event.target.classList.contains('show','open')){
        openCardsList.push(event.target); //add an element to an array
    }
};

//if the list already has another card, check to see if the two cards match
function tracker(){
    if (openCardsList.length < 2){     
    deck.addEventListener('click', addClassShow);
    deck.addEventListener('click', addToOpenCardsList);
    }
    else if(openCardsList.length == 2){
        if(openCardsList[0]===openCardsList[1]){                  //if the cards do match, lock the cards in the open position
            deck.addEventListener('click', addClassMatch);
            openCardsList.splice(0,2);
        }
        else{
            deck.addEventListener('click', hideCards);      //if the cards do not match,hide the card's symbol
            openCardsList.splice(0,2);                  //remove the cards from the list 
        }
    }
};
