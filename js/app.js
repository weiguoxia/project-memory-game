/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-paper-plane-o', 'fa-diamond','fa-anchor', 'fa-bolt', 'fa-cube',
             'fa-leaf', 'fa-bicycle','fa-bomb', 'fa-paper-plane-o', 'fa-diamond',
             'fa-anchor', 'fa-bolt', 'fa-cube','fa-leaf', 'fa-bicycle','fa-bomb',];

let previousCard = null;
let countMatch = 0;
let moves = 0;
let firstClick = false;
let startTime = new Date().getTime();

function clockString() {
  var now = new Date().getTime();
  var distance = now - startTime;
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}

function clock() {
  document.getElementById("clock").innerHTML = clockString();
}

var x;

function showWinPage(numOfStars) {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }


  const htmlDiv = "<div class='center-div'> </div>";
  const htmlClock = '<span>'+ clockString()+'  </span>'
  const htmlTitle = '<h1> Congratulations! you won in '+ htmlClock +'! </h1>';
  const htmlContent = "<p>With " + moves + " moves and " + numOfStars + " Stars.<br> Woooooooo! </p>";
  const htmlCheck = "<div class='fa fa-check-circle-o fa-5x' aria-hidden='true'></div>";
  const htmlButton = '<button onclick="location.reload()">Play again</button>';
  document.body.insertAdjacentHTML("afterBegin",htmlDiv);
  const div = document.querySelector("div");
  div.insertAdjacentHTML("afterbegin", htmlButton);
  div.insertAdjacentHTML("afterbegin", htmlContent);
  div.insertAdjacentHTML("afterbegin", htmlTitle);
  div.insertAdjacentHTML("afterbegin", htmlCheck);
}

function restart() {
  let shuffledCards = shuffle(cards);
  let ul = document.querySelector(".deck");
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
  shuffledCards.forEach(function(card) {
    const htmlTextToAdd = '<li class="card"><i class="fa '+ card +' "></i></li>';
    ul.insertAdjacentHTML('afterbegin', htmlTextToAdd);
  });
  countMatch = 0;
  moves = 0;
  firstClick = false;
  updateMoves();
  updateStars();
  clearInterval(x);
}



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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function updateMoves() {
  document.querySelector(".moves").textContent=moves;
  updateStars();
}

function startClock() {
  startTime = new Date().getTime();
  x = setInterval(clock, 1000);
}

function updateStars() {
  if(moves == 0) {
    document.getElementById("clock").innerHTML = 0 + "d " + 0 + "h " + 0 + "m " + 0 + "s ";
    let ul = document.getElementsByClassName("fa-star-o");
    for (i = 0; i < ul.length; i++) {
      ul[i].classList.add("fa-star");
      ul[i].classList.remove("fa-star-o");
    }
  }else if(moves === 3) {
    let ul = document.querySelector(".stars");
    ul.firstElementChild.firstElementChild.classList.add("fa-star-o");
    ul.firstElementChild.firstElementChild.classList.remove("fa-star");
  } else if(moves === 10) {
    let ul = document.querySelector(".stars");
    ul.children[1].firstElementChild.classList.remove("fa-star");
    ul.children[1].firstElementChild.classList.add("fa-star-o");
  }
}

document.querySelector(".deck").addEventListener('click', function(event) {
  let currentCard = event.target;
  if(firstClick === false) {
    firstClick = true;
    startClock();
  }
  if(currentCard.nodeName === "LI" && currentCard !== previousCard) {
    if(previousCard === null) {
      currentCard.classList.add("show", "open");
      previousCard = currentCard;
    } else if(currentCard.querySelector('i').className === previousCard.querySelector('i').className) {
      currentCard.classList.add("match", "open");
      previousCard.classList.add("match", "open");
      if(++countMatch === 8) {
        const numOfStars = document.getElementsByClassName("fa-star");
        setTimeout(showWinPage,1000, numOfStars.length);
      };
    } else {
      currentCard.classList.add("open", "show");
      setTimeout(function() {
        moves++;
        updateMoves();
        currentCard.classList.remove("open", "show");
        previousCard.classList.remove("open", "show");
        previousCard = null;
      }, 500);
    }
  }
});

document.querySelector(".restart").addEventListener("click",restart);

restart();
