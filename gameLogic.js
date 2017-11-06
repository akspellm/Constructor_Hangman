var inquirer = require('inquirer');

function playGame(guesses, guessed, hashedWord) {

    console.log('\nYour Word: ' + hashedWord + '\n');
    console.log('Incorrect Guesses: ' + guessed);
    console.log('Guesses Remaining: ' + parseFloat(10 - guesses) + '\n');

    if (hashedWord === word) {
        console.log('You Win!');
        var gameOver = new PlayAgain;

        gameOver.ask();
    }

    else if (guesses < 4) {
        inquirer.prompt([
            {
                name: 'letter',
                message: 'Pick a letter'
            }
        ]).then(function (response) {
            var letter = response.letter.toLowerCase();

            if (guessed.includes(letter)) {
                console.log('Already guessed that one, try again')
            }

            else if (letter.length > 1) {
                console.log('Please enter a letter')
            }

            else if (word.includes(letter)) {

                for (var x in word) {
                    if (letter === word[x]) {
                        hashedWord = hashedWord.substring(0, x) + word[x] + hashedWord.substring(parseFloat(x) + 1);
                    }
                }
            }
            else {
                guesses += 1;
                console.log('You guessed wrong!');
                guessed.push(letter);
                return guesses;
            }
        }).then(function () {
            playGame(guesses, guessed, hashedWord);
        })
    } else {
        console.log('Game Over')

        var gameOver = new PlayAgain;

        gameOver.ask();
    }
};

function Game(wordChoices, hashedWord) {

    this.guesses = 0;

    this.lettersGuessed = [];

    this.pickWord = function () {
        var random = '';
        function randomizer() {
            random = Math.floor(Math.random() * wordChoices.length);
        }
        randomizer();
        word = wordChoices[random];
    };

    this.hashWord = function () {
        for (x in word) {
            if (word[x] === ' ') {
                hashedWord += ' ';
            }
            else {
                hashedWord += '_';
            }
        }

        return hashedWord;
    }
};

function PlayAgain() {
    this.ask = function () {
        inquirer.prompt([
            {
                name: 'playAgain',
                message: 'Do you want to play again?',
                type: 'confirm'
            }
        ]).then(function (response) {
            if (response.playAgain) {
                word = '';
                hashedWord = '';
                var wordChoices = ['jay z', 'eminem', 'kanye', 'lil wayne', 'drake', 'kendrick lamar', 'dr dre', 'snoop dog'];

                newGame = new Game(wordChoices, hashedWord);
                newGame.pickWord();
                hashedWord = newGame.hashWord();

                playGame(newGame.guesses, newGame.lettersGuessed, hashedWord)
            }
        })
    }
};

module.exports = {
    playGame: playGame,
    Game: Game
};