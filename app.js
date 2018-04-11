// Defining the variables
const deck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moveCounter');
const stars = document.querySelector('.stars');
const time = document.querySelector('.time');

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
            console.log(matchCards);
            match++;
            setTimeout(function() {  
                if (match === 8) {      // If all cards have matched, display a message with the final score 
                endGame();    
                }  
           }, 600);                    
       }       
        else {                               //If the cards do not match, hide the card's symbol and remove the cards from the openCards list
            setTimeout(function() {          //Delay the execution of functions by 0,5 second, so the cards are visible for a moment
                hideCards(openCards[0]);
                hideCards(openCards[1]);                       
                openCards = [];          
            }, 500);                       
        }
    }
    else {
        showCards(clickedCard);
        openCards.push(clickedCard);
        let timer = setInterval(countTime, 1000);       //Start the timer when a player clicks the first card
    }
}
// Increment the move counter and display it on the page
let moves = 0;
function countMoves(){
    moves++;
    moveCounter.innerHTML = moves;
}

//Star rating - Remove stars after a number of moves

let star3 = document.getElementsByClassName("fa fa-star")[2];
let star2 = document.getElementsByClassName("fa fa-star")[1];
let star1 = document.getElementsByClassName("fa fa-star")[0];

function removeStars(){
    if (moves == 22){
        star3.classList.remove("fa-star");
        star3.classList.add("fa-star-o");
    }
    else if (moves == 30){
        star2.classList.remove("fa-star");
        star2.classList.add("fa-star-o");
    }
    else if (moves == 40){
        star1.classList.remove("fa-star");
        star1.classList.add("fa-star-o");
    }
}

let starsNumber ="";
function countStars(){
    if (moves< 22){
        starsNumber = 3;
    }
    else if (moves >= 22 && moves < 30){
        starsNumber = 2;
    }
    else if (moves >= 30 && moves < 40){
        starsNumber = 1;
    }
    else if (moves >= 40){
        starsNumber = 0;
    }
}

// Event listener - a card is clicked -display the card's symbol
deck.addEventListener('click', function(event){
    if (event.target.nodeName === 'LI'){
        tracker(event);
        countMoves();
        removeStars();
        countStars();
    }
});

//Function to end the game
function endGame(){
    alert("Congratulations! You won!"+"\n"+"With "+ moveCounter.innerText +" moves and "+ starsNumber +" stars!"+"\n"+"Your time is "+time.innerText+"\n"+"Play again!");     
    location.reload();
    clearInterval(timer);
}

//Set a timer
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
let seconds = 0;

function countTime() {
  seconds++;
  second.innerHTML = pad(seconds % 60);
  minute.innerHTML = pad(parseInt(seconds / 60));
  hour.innerHTML = pad(parseInt(seconds / 3600));       // problem with measuring hours - there were 220 minutes and 3 hours - fix it
}
function pad(num) {             //Double digit timer
  let numString = num + "";
  if (numString.length < 2) {
        return "0" + numString;
  } 
  else {
        return numString;
  }
}
