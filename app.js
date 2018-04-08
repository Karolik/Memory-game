// Defining the variables
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const stars = document.querySelector('.stars');
const time = document.querySelector('#time');

/*
 * Create a list that holds all of your cards
 */
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb", "fa fa-anchor", "fa fa-anchor" ];

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
//add the card to a *list* of "open" cards
let openCards = [];
let matchedCards = [];              //matchedCards.classList.contains('match'); //instead of storing all the card details in an array, you could use a simple counter to count the number of matches. When it reaches 8 the game is done


function showCards(event) {
    event.target.classList.add('show','open');
}
//deck.addEventListener('click', showCards);

function matchCards(card) {
    card.classList.add('match');
}

function hideCards(card) {
    card.classList.remove('show','open');
}


//if the list already has another card, check to see if the two cards match
function tracker(){
    let clickedCard = event.target; 
    if (openCards.length > 0) {
        showCards(event);
        openCards.push(clickedCard);
        console.log(openCards);
       if(openCards[0].innerHTML === openCards[1].innerHTML){     //if the cards do match, lock the cards in the open position
      // if(openCards[0].firstElementChild === openCards[1].firstElementChild){   
            matchCards(openCards[0]);
            matchCards(openCards[1]);
            openCards = [];                        //remove the cards from the list (//openCards.splice(0,2);)
            matchedCards.push(openCards[0],openCards[1]);
       }       
        else {
            let hideCard1;
            let hideCard2;
            
            function myFunction() {
                hideCard1 = setTimeout(hideCards, 1000, openCards[0]);      //if the cards do not match, hide the card's symbol
                hideCard2 = setTimeout(hideCards, 1000, openCards[1]);
            }
            myFunction();
           // hideCards(openCards[0]);
           // hideCards(openCards[1]);                       
            openCards = [];
            //console.log(hideCards(openCards[1])); 
           // console.log(hideCards(openCards[0]));                         
        }
        console.log(matchedCards);
        console.log(openCards);
    }
    else {
        showCards(event);
        openCards.push(clickedCard);
        console.log(openCards);
    }
}
deck.addEventListener('click', tracker);
