// global variable declarations and element getting
const main = document.querySelector('#main');
const div = document.createElement('div');
const h2 = document.createElement('h2');
const p = document.createElement('p');
const startButton = document.querySelector('#start-button');
const textInput = document.querySelector('#number-of-wins');
let numberOfWins;
let	computerScore = 0;
let playerScore = 0;
let computerCards;
let playerCards;

let computerChoice;
let playerChoice;

// global function definitions
function startGame () {
	
	if (Number.isInteger(parseInt(textInput.value)) && !isNaN(parseInt(textInput.value))) {
		numberOfWins = textInput.value;
		main.innerHTML = '';

		buildGameScreen();
	}
	else {
		alert('Please input a valid (whole) number.')
		numberOfWins = textInput.value = '';

	}
}

function buildGameScreen() {

	let computerCards = div.cloneNode();
	main.appendChild(computerCards);
	computerCards.classList.add('computer-cards')

	const score = div.cloneNode();
	main.appendChild(score);
	score.classList.add('score')

	let playerCards = div.cloneNode();
	main.appendChild(playerCards);
	playerCards.classList.add('player-cards')

	for (let i = 1; i <= 3; i++) {
		computerCards.appendChild(div.cloneNode());
		playerCards.appendChild(div.cloneNode());
		if (i === 1) {
			computerCards.childNodes[i-1].classList.add('rock');
			computerCards.childNodes[i-1].innerHTML = `<img src="images/rock.png" alt="Rock" width="100px">`;

			playerCards.childNodes[i-1].classList.add('rock');
			playerCards.childNodes[i-1].innerHTML = `<img src="images/rock.png" alt="Rock" width="100px">`;
		}
		if (i === 2) {
			computerCards.childNodes[i-1].classList.add('paper');
			computerCards.childNodes[i-1].innerHTML = `<img src="images/paper.png" alt="Paper" width="100px">`;

			playerCards.childNodes[i-1].classList.add('paper');
			playerCards.childNodes[i-1].innerHTML = `<img src="images/paper.png" alt="Paper" width="100px">`;
		}
		if (i === 3) {
			computerCards.childNodes[i-1].classList.add('scissors');
			computerCards.childNodes[i-1].innerHTML = `<img src="images/scissors.png" alt="Scissors" width="100px">`;

			playerCards.childNodes[i-1].classList.add('scissors');
			playerCards.childNodes[i-1].innerHTML = `<img src="images/scissors.png" alt="Scissors" width="100px">`;
		}
	}
	score.appendChild(p.cloneNode());
	score.appendChild(h2.cloneNode());
	score.childNodes[1].textContent = 'SCORE!'
	score.appendChild(div.cloneNode());
	const lastRoundResult = score.childNodes[0];
	const currentScore = score.childNodes[2];

	lastRoundResult.classList.add('last-round-result')
	currentScore.classList.add('current-score');
	currentScore.appendChild(p.cloneNode());
	currentScore.appendChild(p.cloneNode());
	currentScore.childNodes[0].classList.add('player-score');
	currentScore.childNodes[1].classList.add('computer-score');
	setPlayerScore(playerScore);
	setComputerScore(computerScore);
	const winCon = p.cloneNode();
	winCon.classList.add('win-condition');
	score.appendChild(winCon);
	winCon.innerText = 'The first to win ' + numberOfWins + ' rounds wins the game!';

	function noCardsSelected() {
		return !playerCards.childNodes[0].classList.contains('selected') && !playerCards.childNodes[1].classList.contains('selected') && !playerCards.childNodes[2].classList.contains('selected')
	}

	computerChoice = getComputerChoice();
	playerCards.childNodes.forEach((card) => {
		card.addEventListener('click', () => {
			if (noCardsSelected()) {
				playerChoice = card.classList[0];
				document.querySelector('.player-cards .' + playerChoice).classList.add('selected')
				computerCards.childNodes.forEach((card) => {
				if (card.classList.contains(computerChoice)) {
					card.classList.add('selected')
				}
		})
			}
		})
	})


}


function setPlayerScore (score) {
	document.querySelector('.current-score .player-score').innerHTML = `Player score<br>` + score;
}
function setComputerScore (score) {
	document.querySelector('.current-score .computer-score').innerHTML = `Computer score<br>` + score
}
function getComputerChoice() {
	return ['rock', 'paper', 'scissors'] [Math.floor(Math.random()*3)]
}

// global event listeners
startButton.addEventListener('click', startGame);
textInput.addEventListener('keydown', (event) => {
	if (event.keyCode === 13) {
		startButton.click();
	}
})
