// Defining the variables

const deck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moveCounter');
const stars = document.querySelector('.stars');
const time = document.querySelector('.time');
const restart = document.querySelector('.restart');

// Create a list that holds all of your cards

const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb", "fa fa-anchor", "fa fa-anchor" ];

/* Or an alternative approach suggested by a reviewer:
* const myArray = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-anchor"];
* const doubledArray = myArray.concat(myArray);
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

//Function to start the game: display the cards on the page and shuffle them using the provided "shuffle" method above

function initialize() {
    shuffle(cards);

    //Loop through each card and create its HTML; Add each card's HTML to the page (Store the HTML in a string)
    let cardGrid = "";
    for(const card of cards) {
        cardGrid += '<li class="card"><i class="'+card+'"></i></li>';
    }
    /* Or alternative: Rather than using strings to create items you can use the DOM methods directly:
    * const card = document.createElement("li");
    * card.classList.add("a-class", "a-second-class");
    */
    deck.insertAdjacentHTML('afterbegin', cardGrid);
}

window.onload = initialize();

// The restart button

restart.addEventListener('click', function() {
    document.location.href="";
    }
)

// Opening, matching and hiding cards, when clicked

let openCards = [];                 //A list of open cards

function showCards(card) {
    card.classList.add('show','open','animated','flipInY','blockClick');
}

function matchCards(card) {
    card.classList.remove('animated','flipInY')
    card.classList.add('match','animated','bounceIn','blockClick');
}

function hideCards(card) {
    card.classList.remove('show','open','animated','flipInY','blockClick');
    card.classList.add('hide','animated','tada');
    setTimeout(function() {
        card.classList.remove('hide','animated','tada');
    }, 700);
}

let match = 0;

// Function to open, match and hide cards; is called when a card is clicked

function tracker(){
    let clickedCard = event.target;
    if (openCards.length > 0) {         //If the list already has another card, check to see if the two cards match
        showCards(clickedCard);
        openCards.push(clickedCard);    //Add the card to a *list* of "open" cards
        console.log(openCards);
        if(openCards[0].innerHTML === openCards[1].innerHTML){     //If the cards do match, lock the cards in the open position  
            matchCards(openCards[0]);
            matchCards(openCards[1]);
            openCards = [];              //Remove the cards from the openCards list
            console.log(matchCards);
            match++;                     // Add the match to the number of matches
            setTimeout(function() {
                if (match === 8) {      // If all cards have matched, call the endGame function to finish the game
                endGame();
                }
            }, 600);
        }
        else {                               //If the cards do not match, hide the card's symbol and remove the cards from the openCards list
            setTimeout(function() {          //Delay the execution of functions by 0,5 second, so the cards are visible for a moment
                hideCards(openCards[0]);
                hideCards(openCards[1]);
                openCards = [];
            }, 100);
        }
    }
    else {
        showCards(clickedCard);
        openCards.push(clickedCard);
    }
}

// Increment the move counter and display it on the page

let moves = 0;
function countMoves() {
    moves++;
    moveCounter.innerHTML = parseInt(moves/2);          //Moves are counted each time a pair of cards gets open/matched(every second click)
}

//Star rating - Remove stars after a number of moves

const star3 = document.getElementsByClassName("fa fa-star")[2];
const star2 = document.getElementsByClassName("fa fa-star")[1];
//const star1 = document.getElementsByClassName("fa fa-star")[0];

function removeStars() {
    if (moves == 22){
        star3.classList.remove("fa-star");
        star3.classList.add("fa-star-o");
    }
    else if (moves == 40) {
        star2.classList.remove("fa-star");
        star2.classList.add("fa-star-o");
    }
}

let starsNumber ="";
function countStars() {
    if (moves< 22){
        starsNumber = 3;
    }
    else if (moves >= 22 && moves < 40) {
        starsNumber = 2;
    }
    else if (moves >= 40) {
        starsNumber = 1;
    }
}

// Event listener - a card is clicked -display the card's symbol

let timer;

deck.addEventListener('click', function(event) {
    if (event.target.nodeName === 'LI'){
        tracker(event);
        countMoves();
        removeStars();
        countStars();
        //timer = setInterval(countTime, 1000);
    }
    //TODO: Start the timer when a player clicks the first card
   /* if (moves === 1){
        timer = setInterval(countTime, 1000);
    }*/
});

function startTimer() {
    // Remove the event listener from all the cards..
    deck.forEach((card) => {
        card.removeEventListener('click', startTimer);
    });
    timer = setInterval(countTime, 1000);
}

deck.forEach((card) => {
    card.addEventListener('click', startTimer);
});

/*Add an event listener to each card in the deck. It should start the timer when the card is clicked: `card.addEventlistener("click", startTimer);
Inside of the startTimer function, remove the event listener to prevent more timers from being started:
// `deck` is an array with all the cards that are displayed.

*/

//Set a timer

const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
let seconds = 0;

function countTime() {
    seconds++;
    let h = hour.innerHTML = dd(parseInt(seconds / 3600));
    minute.innerHTML = dd(parseInt((seconds - h*3600) / 60));   // When counter reaches 3600 sec, the number is visible as hours (1 hour), not as minutes (60)
    second.innerHTML = dd(seconds % 60);
}

function dd(num) {  //Double digit timer 00:00:00 (not 0:0:0)
    let numString = num + "";
    if (numString.length < 2) {
        return "0" + numString;
    }
    else {
        return numString;
    }
}

//Function to end the game

function endGame(){
    //TODO: Popup message at the end of the game
    swal({
        title: "Congratulations! You won!",
        text: "With "+ moveCounter.innerText +" moves and "+ starsNumber +" stars!"+"\n"+"Your time is "+time.innerText+"!",
        icon: "success",
        button: "Play again!",
    //TODO: When the button is clicked to Play again, the game is restarted   
    }).then((result) => {
        document.location.href="";
    })
    //TODO: Stop the timer
    clearInterval(timer);
}
