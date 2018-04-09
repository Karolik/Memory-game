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

//Function to restart the game

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

/* Opening, matching and hiding cards, when clicked*/

let openCards = [];                 //a list of open cards
//let matchedCards = [];   //matchedCards.classList.contains('match'); //instead of storing all the card details in an array, you could use a simple counter to count the number of matches. When it reaches 8 the game is done


function showCards(card) {
    card.classList.add('show','open');
}

function matchCards(card) {
    card.classList.add('match');
}

function hideCards(card) {
    card.classList.remove('show','open');
}
let match = 0;

function tracker(){
    let clickedCard = event.target; 
    if (openCards.length > 0) {         //If the list already has another card, check to see if the two cards match
        showCards(clickedCard);
        openCards.push(clickedCard);    //Add the card to a *list* of "open" cards
        console.log(openCards);
       if(openCards[0].innerHTML === openCards[1].innerHTML){     //If the cards do match, lock the cards in the open position  
            matchCards(openCards[0]);
            matchCards(openCards[1]);
            openCards = [];                        //Remove the cards from the openCards list (//openCards.splice(0,2);)
           // matchedCards.push(openCards[0],openCards[1]);
            console.log(matchCards);
            match++;
            //setTimeout(function() {  
                if (match === 8) {      // If all cards have matched, display a message with the final score 
                alert("Congratulations! You won!"+"\n"+"With x moves and x stars!"+"\n"+"Play again!");     
                location.reload();
                }  
           // }, 600);                
            /*
            setTimeout(function() {  
                if (matchedCards.length === 16) {      // If all cards have matched, display a message with the final score 
                    alert("Congratulations! You won!"+"\n"+"With x moves and x stars!"+"\n"+"Play again!");     
                    location.reload();
                }                             
            }, 600);    
            */       
       }       
        else {                               //If the cards do not match, hide the card's symbol and remove the cards from the openCards list
            setTimeout(function() {          //Delay the execution of functions by 0,5 second, so the cards are visible for a moment
                hideCards(openCards[0]);
                hideCards(openCards[1]);                       
                openCards = [];          
            }, 500);                       
        }
       // console.log(matchedCards);
    }
    else {
        showCards(clickedCard);
        openCards.push(clickedCard);
    }
}

/* Event listener - a card is clicked -display the card's symbol*/
deck.addEventListener('click', function(event){
    if (event.target.nodeName === 'LI'){
        tracker(event);
        console.log('true');
    }
});
