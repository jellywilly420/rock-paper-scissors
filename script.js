// global variable declarations and element getting
const choices = ['rock', 'paper', 'scissors'];
const main = document.querySelector('#main');
const div = document.createElement('div');
const h2 = document.createElement('h2');
const p = document.createElement('p');
const a = document.createElement('a');
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
	if (Number.isInteger(parseInt(textInput.value)) && !isNaN(parseInt(textInput.value)) && parseInt(textInput.value) > 0) {
		numberOfWins = parseInt(textInput.value);
		main.innerHTML = '';

		buildGame();
	}
	else {
		alert('Please input a valid (whole) number.')
		numberOfWins = textInput.value = '';

	}
}

function buildGame() {
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
	const lastRoundResult = p.cloneNode();
	const currentScore = div.cloneNode();
	const nextRoundButton = a.cloneNode();
	const winCon = p.cloneNode();

	score.appendChild(lastRoundResult);
	score.appendChild(nextRoundButton);
	score.appendChild(h2.cloneNode());
	score.childNodes[2].textContent = 'SCORE!' // is the h2 inside of .score
	score.appendChild(currentScore);

	lastRoundResult.classList.add('last-round-result')
	nextRoundButton.innerText = 'NEXT ROUND';
	nextRoundButton.setAttribute('href', '#')
	nextRoundButton.classList.add('invisible');
	nextRoundButton.addEventListener('click', () => {
		playerCards.childNodes.forEach((card) => {
			if (card.classList.contains('selected')) {
				card.classList.toggle('selected');
			}
		})
		computerCards.childNodes.forEach((card) => {
			if (card.classList.contains('selected')) {
				card.classList.toggle('selected');
			}
		})
		nextRoundButton.classList.toggle('invisible');
		playRound();
	})

	currentScore.classList.add('current-score');
	currentScore.appendChild(p.cloneNode());
	currentScore.appendChild(p.cloneNode());
	currentScore.childNodes[0].classList.add('player-score');
	currentScore.childNodes[1].classList.add('computer-score');
	setPlayerScore(playerScore);
	setComputerScore(computerScore);
	winCon.classList.add('win-condition');
	score.appendChild(winCon);
	winCon.innerText = 'The first to win ' + numberOfWins + ' rounds wins the game!';


	playRound();

	function playRound() {
		computerChoice = getComputerChoice();
		playerCards.childNodes.forEach((card) => {
			card.addEventListener('click', () => {
				if (noCardsSelected()) {
					playerChoice = card.classList[0];
					document.querySelector('.player-cards .' + playerChoice).classList.add('selected');

					computerCards.childNodes.forEach((card) => {
						if (card.classList.contains(computerChoice)) {
									card.classList.add('selected')
						}
					})

					let winner = compareChoices();
					console.log(winner);

					if (winner === playerChoice) {
						playerScore++;
						setPlayerScore();
						lastRoundResult.innerText = playerChoice + ' beats ' + computerChoice + '. You win this round!';
					}
					else if (winner === computerChoice) {
						computerScore++;
						setComputerScore();
						lastRoundResult.innerText = computerChoice + ' beats ' + playerChoice + '. Computer wins this round!';
					}
					else {
						lastRoundResult.innerText = `It's a tie! No winners this round!`;
					}

					if ((computerScore < numberOfWins) && (playerScore < numberOfWins)) {
						nextRoundButton.classList.toggle('invisible');
					}
					else {
						if (computerScore > playerScore) {
							nextRoundButton.removeEventListener('click', () => {
								playerCards.childNodes.forEach((card) => {
									if (card.classList.contains('selected')) {
										card.classList.toggle('selected');
									}
								})
								computerCards.childNodes.forEach((card) => {
									if (card.classList.contains('selected')) {
										card.classList.toggle('selected');
									}
								})
								nextRoundButton.classList.toggle('invisible');
								playRound();
							})

							nextRoundButton.setAttribute('href', './index.html');
							lastRoundResult.innerText = `Uh Oh! Looks like you lost :(
							How about you try again?`;
							nextRoundButton.innerText = 'Play again!';
							nextRoundButton.classList.toggle('invisible');
						}
						else {
							nextRoundButton.removeEventListener('click', () => {
								playerCards.childNodes.forEach((card) => {
									if (card.classList.contains('selected')) {
										card.classList.toggle('selected');
									}
								})
								computerCards.childNodes.forEach((card) => {
									if (card.classList.contains('selected')) {
										card.classList.toggle('selected');
									}
								})
								nextRoundButton.classList.toggle('invisible');
								playRound();
							})

							nextRoundButton.setAttribute('href', './index.html');
							lastRoundResult.innerText = `Congrats! You won :D
							Do you want to play again?`;
							nextRoundButton.innerText = 'Play again!';
							nextRoundButton.classList.toggle('invisible');
						}
					}
				}
			})
		})
	}

	function compareChoices() {
		if (playerChoice === computerChoice) {
			return 'draw';
		}
		else if ((playerChoice === 'rock' && computerChoice === 'scissors') || (playerChoice === 'paper' && computerChoice === 'rock') || (playerChoice === 'scissors' && computerChoice === 'paper')) {
			return playerChoice;
		}
		else {
			return computerChoice;
		}
	}

	function noCardsSelected() {
		return !playerCards.childNodes[0].classList.contains('selected') && !playerCards.childNodes[1].classList.contains('selected') && !playerCards.childNodes[2].classList.contains('selected')
	}
}

function setPlayerScore () {
	document.querySelector('.current-score .player-score').innerHTML = `Player score<br>` + playerScore;
}
function setComputerScore () {
	document.querySelector('.current-score .computer-score').innerHTML = `Computer score<br>` + computerScore
}
function getComputerChoice() {
	return choices[Math.floor(Math.random()*3)]
}

// global event listeners
startButton.addEventListener('click', startGame);
textInput.addEventListener('keydown', (event) => {
	if (event.keyCode === 13) {
		startButton.click();
	}
})