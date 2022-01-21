import React from "react";

import { MyContext } from "../../../App";

import { Game, Nav, GameHeader } from "../../../common/styles";

import Board from "./Board";
import Scoreboard from "./components/Scoreboard";
import InitialState from "./InitialState.json";
import Dictionary from "../../../common/dictionaries/Serie1Dictionary.json";

class Puzzle extends React.Component {
  constructor(props) {
    super(props);

    let dictionary = Object.keys(Dictionary.line1);

    this.state = (
        {
          word: InitialState.word,
          isModalDisplayed: InitialState.isModalDisplayed,
          isInGameLoop: InitialState.isInGameLoop,
          tileClass: InitialState.tileClass,
          titleClass: InitialState.titleClass,
          title: InitialState.title,
          randomWord: InitialState.randomWord,
          dictionary: Dictionary.line1,
          alphabet: InitialState.alphabet,
          wordLength: Math.max(...(dictionary.map(el => el.length))),
          startingBlock: InitialState.startingBlock,
          tiles: InitialState.tiles,
          startingTiles: InitialState.startingTiles,
          score: InitialState.score,
          time: InitialState.time,
          matches: InitialState.matches,
          remainingMatches: InitialState.remainingMatches,
          foundWords: InitialState.foundWords,
          timer: InitialState.timer,
          wordsToCheck: InitialState.wordsToCheck,
          scoreHash: InitialState.scoreHash
        }
    );
  }

  // set tiles at starting position
  resetTilePositions = () => {
    let tiles = this.state.tiles;
    tiles.length = this.state.wordLength;
    for (let i = 0; i < this.state.wordLength; i++) {
      let temp = tiles;
      console.log(temp[i]);
      temp[i].x = 3 + i;
      temp[i].y = 5;
      this.setState({ tiles: temp });
    };
  };

  generateMatches = letters => {
    // get an array of all possible permutations
    let allPossible = this.getPermutationsAllLengths(letters.toLowerCase());
    let results = [];
    // check all posible permutations
    for (let i = 0; i < allPossible.length; i++) {
      if (this.state.dictionary.hasOwnProperty(allPossible[i])) {
        results.push(allPossible[i]);
      }
    }
    // filter out duplicates and sort by length
    results = [...new Set(results)].sort((a, b) => b.length - a.length);
    this.setState({ matches: results, remainingMatches: results });
    return results;
  };

  swap = (array, i, j) => {
    if (i !== j) {
      let swap = array[i];
      array[i] = array[j];
      array[j] = swap;
    }
  };

  permute_rec = (res, str, array) => {
    if (array.length === 0) {
      res.push(str);
    } else {
      for (let i = 0; i < array.length; i++) {
        this.swap(array, 0, i);
        this.permute_rec(res, str + array[0], array.slice(1));
        this.swap(array, 0, i);
      }
    }
  };

  xpermute_rec = (res, sub, array) => {
    if (array.length === 0) {
      if (sub.length > 0) this.permute_rec(res, "", sub);
    } else {
      this.xpermute_rec(res, sub, array.slice(1));
      this.xpermute_rec(res, sub.concat(array[0]), array.slice(1));
    }
  };

  // find all permutations for all lengths
  getPermutationsAllLengths = array => {
    let res = [];
    this.xpermute_rec(res, [], array);
    return res;
  };

  // play a sound
  playSound = sound => {
    let audio = new Audio(`${sound}.mp3`);
    audio.volume = 0.2;
    let playPromise = audio.play();

    playPromise.then(function() {}).catch(function(error) {
      console.log(error);
    });
  };

  // Durstenfeld shuffle
  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // get ran
  // dom word from dictionary with length of n
  getNewDictionary = () => {
    let dictionaries = Object.keys(Dictionary);
    let shuffledArray = this.shuffleArray(dictionaries);
    return Dictionary[shuffledArray[0]];
  };

  // get random word from dictionary with length of n
  getWordFromDictionary = lengthOfWord => {
    let words = Object.keys(this.state.dictionary);
    console.log(words);
    let arrayOfNLengthStrings = words.filter(
        word => word.length === lengthOfWord
    );
    let shuffledArray = this.shuffleArray(arrayOfNLengthStrings);
    return shuffledArray[0];
  };

  // get a word
  getWord = () => {
    let wordLength = this.state.wordLength;
    console.log(wordLength);
    let word = this.getWordFromDictionary(wordLength);
    console.log(word);

    word = this.shuffleArray(word.split("")).join("");
    this.setState({ randomWord: word });
    for (let i = 0; i < word.length; i++) {
      let temp = this.state.tiles;
      temp[i].letter = word[i].toUpperCase();
      this.setState({ tiles: temp });
    }
    return word;
  };

  // add score of word to total score
  incrementScore = scoreOfWord => {
    let newScore = this.state.score + scoreOfWord;
    this.setState({ score: newScore });
    this.checkVictoryConditions();
  };

  // end game if all matches are found
  checkVictoryConditions = () => {
    if (this.state.remainingMatches.length === 0) {
      this.endGameLoop();
    } else {
      return;
    }
  };

  // end gameloop
  endGameLoop = () => {
    this.setState({
      isInGameLoop: false,
      tiles: this.state.startingTiles
    });
    this.playSound("wood1");
    this.handleShowResultsModal();
  };

  // display results modal
  handleShowResultsModal = () => {
    this.setState({ isModalDisplayed: true });
  };

  // score word
  scoreWord = word => {
    let letters = word.split("");
    let result = 0;
    for (let i = 0; i < letters.length; i++) {
      result += this.state.scoreHash[letters[i]].points;
    }
    this.incrementScore(result);
  };

  // start gameloop
  startGameLoop = () => {
    let word = this.getWord();
    this.resetTilePositions();
    this.generateMatches(word);
    this.setState({isInGameLoop: true, foundWords: [], score: 0});
    this.playSound("woodshuffle");
  };

  // reset tiles to starting positions
  resetTiles = () => {
    this.setState({ tiles: this.state.startingTiles });
  };

  // check if word is a valid english word
  validateWord = word => {
    let result = false;
    if (this.state.dictionary.hasOwnProperty(word)) {
      result = true;
    }
    this.handleValidityCheck(result, word);
  };

  // check if word is a valid dutch word
  handleValidityCheck = (isValid, word) => {
    if (isValid && !this.state.foundWords.includes(word) && word.length !== this.state.wordLength) {
      // if a valid word is found
      this.scoreWord(word);
      this.addWordToFoundWords(word);
      this.playSound("minor-success");
    } else if (
        isValid &&
        !this.state.foundWords.includes(word) &&
        word.length === this.state.wordLength
    ) {
      let newDictionary = this.getNewDictionary();
      this.setState({dictionary: newDictionary}
          ,  () => { console.log(this.state.dictionary);
          });

      // if the longest word is found
      this.scoreWord(word);
      this.addWordToFoundWords(word);
      this.playSound("success");
      // this.resetTilePositions();
      // this.handleLongestWordFound();
      this.startGameLoop();
      this.setState({wordLength: Math.max(...(Object.keys(newDictionary).map(el => el.length)))}
          ,  () => { console.log(this.state.wordLength);
          });
    }
  };

  // if the longest word is found
  handleLongestWordFound = () => {
    this.setState({ titleClass: "app-title animated tada" });
    setTimeout(() => this.setState({ titleClass: "app-title" }), 1500);
  };

  // add a word to FoundWords
  addWordToFoundWords = word => {
    let newFoundWords = this.state.foundWords;
    newFoundWords.push(word);
    this.setState({ foundWords: newFoundWords });
    this.removeFromRemaining(word);
  };

  // remove word from remaining matches
  removeFromRemaining = word => {
    let array = this.state.remainingMatches;
    let index = array.indexOf(word);
    if (index > -1) {
      array.splice(index, 1);
      this.setState({ remainingMatches: array });
    }
  };

  // close results modal
  handleCloseResultsModal = () => {
    this.setState({ isModalDisplayed: false });
  };

  // check for words in matrix
  checkForWords = () => {
    let capturedTiles = [];
    let tiles = this.state.tiles;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].y === this.state.wordLength) {
        capturedTiles.push(tiles[i]);
      }
    }
    let result = "";

    // sort by x position in matrix
    capturedTiles.sort((a, b) => {
      return a.x > b.x ? 1 : b.x > a.x ? -1 : 0;
    });

    let containsALetter = function(element, index) {
      return element.x === index + 1;
    };

    for (let j = 0; j < this.state.wordLength; j++) {
      if (!capturedTiles.some(el => containsALetter(el, j))) {
        capturedTiles.splice(j, 0, " ");
      }
    }

    for (let j = 0; j < capturedTiles.length; j++) {
      if (capturedTiles[j].letter) {
        result += capturedTiles[j].letter.toLowerCase();
      } else {
        result += " ";
      }
    }

    this.validateWord(result.trim());
  };

  // update tile position
  updateTiles = stateTiles => {
    this.setState({ tiles: stateTiles });
    this.playSound("wood3");
  };

  render() {
    return (
        <MyContext.Consumer>
          {context => (
              <GameHeader bg={context.state.bg} size="400px" filter="1">
                <Scoreboard
                    isInGameLoop={this.state.isInGameLoop}
                    foundWords={this.state.foundWords}
                    score={this.state.score}
                    remainingMatches={this.state.remainingMatches}/>
                <Game style={{paddingRight: '23%'}}>
                  <Nav type="back" to="/"/>
                  <div>
                    <Board
                        tiles={this.state.tiles}
                        updateTiles={this.updateTiles}
                        scoreHash={this.state.scoreHash}
                        isInGameLoop={this.state.isInGameLoop}
                        checkForWords={this.checkForWords}
                        tileClass={this.state.tileClass}
                        startGameLoop={this.startGameLoop}
                        wordLength={this.state.wordLength}
                    />
                  </div>
                </Game>
              </GameHeader>
          )}
        </MyContext.Consumer>
    );
  }
};
export default Puzzle;