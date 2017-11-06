var inquirer = require('inquirer');
var gameLogic = require('./gameLogic.js');

var word = '';
var wordChoices = ['jay z', 'eminem', 'kanye', 'lil wayne', 'drake', 'kendrick lamar', 'dr dre', 'snoop dog'];
var hashedWord = '';

console.log('\n*******************');
console.log('\nWELCOME!');
console.log();
console.log('Let\'s play some hangman!');
console.log('Your category is contemporary rappers');
console.log()
console.log('*******************');

var newGame = new gameLogic.Game(wordChoices, hashedWord);

newGame.pickWord();
hashedWord = newGame.hashWord();

gameLogic.playGame(newGame.guesses, newGame.lettersGuessed, hashedWord);