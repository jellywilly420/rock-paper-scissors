let choices = {
	1: "rock",
	2: "paper",
	3: "scissors"
}

// Ask the user for their choice

function getUserChoice () {
	let userChoice = prompt ("What do you choose? (1-Rock 2-Paper 3-Scissors)")
	if (Number(userChoice) === 1 || Number(userChoice) === 2 || Number(userChoice) === 3) {
		return choices [userChoice]
	}
	else if (userChoice.toLowerCase() === choices[1] || userChoice.toLowerCase() === choices[2] || userChoice.toLowerCase() === choices[3]) {
		return userChoice.toLowerCase();
	}
	else {
		alert ('Please Enter a valid choice!')
		return
	}
}

// calculate the computer's choice

function getComputerChoice () {
	let computerChoice = Math.ceil(Math.random()*3);
	return choices[computerChoice];
}

// compare the two choices and anounce the winner of the round

function compare (userChoice, computerChoice) {
	console.log("\n");
	console.log("\n");
	console.log (`You chose: ` + userChoice);
	console.log (`Computer chose: ` + computerChoice);
	console.log("\n");
	console.log("\n");
	if (userChoice === computerChoice) {
		console.log (`It's a tie! :/`)
	}
	else if ((userChoice === "rock" && computerChoice === "scissors") || (userChoice === "paper" && computerChoice === "rock") || (userChoice === "scissors" && computerChoice === "paper")) {
		console.log (`You won! `+ userChoice +` beats `+ computerChoice +` :D`);
		console.log("\n");
		return ("user");
	}
	else {
		console.log (`You lost! `+computerChoice +` beats `+ userChoice +` :(`)
		console.log("\n");
		return ("computer");
	}
}

// tally & game

let gameOn = true;
let userScore = 0;
let computerScore = 0;
while (gameOn) {
	let userChoice = getUserChoice();
	let computerChoice = getComputerChoice();
	let winner = compare (userChoice, computerChoice);
	if (winner === "user") {
		userScore++;
	}
	else if (winner === "computer") {
		computerScore++;
	}
	console.log (`Current score:\nUser: ` + userScore + `|| Computer: ` + computerScore)
	if (userScore === 5) {
		console.info ("Congrats! You Won! :D")
		gameOn = false;
	}
	if  (computerScore === 5) {
		console.error ("Oh no! You lost.. D:")
		gameOn = false;
	}
}
