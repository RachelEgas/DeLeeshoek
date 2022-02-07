import React from "react";

import { MyContext } from "../../../App";

import { Game } from "../../../common/styles";

import Board from "./Board";
import Scoreboard from "./components/Scoreboard";
import InitialState from "./InitialState.json";
import Dictionary from "../../../common/dictionaries/Serie1Dictionary.json";
import Win from "../Win";
import {ImagesProvider} from "../../../contexts/ImagesContext";

class Puzzle extends React.Component {
  constructor(props) {
    super(props);

    let lineDictionary = Object.keys(Dictionary.lines[props.bookNumber-1]);

    this.state = (
        {
          word: InitialState.word,
          isModalDisplayed: InitialState.isModalDisplayed,
          isInGameLoop: InitialState.isInGameLoop,
          tileClass: InitialState.tileClass,
          titleClass: InitialState.titleClass,
          title: InitialState.title,
          dictionary: Dictionary.lines[props.bookNumber-1],
          alphabet: InitialState.alphabet,
          wordLength: Math.max(...(lineDictionary.map(el => el.length))),
          startingBlock: InitialState.startingBlock,
          tiles: InitialState.tiles,
          startingTiles: InitialState.startingTiles,
          time: InitialState.time,
          matches: InitialState.matches,
          remainingMatches: Object.keys(Dictionary.lines[props.bookNumber-1]),
          foundWords: InitialState.foundWords,
          timer: InitialState.timer,
          wordsToCheck: InitialState.wordsToCheck,
          completed: false
        }
    );
  }

  // set tiles at starting position
  resetTilePositions = (word) => {
    let tiles = this.state.tiles;
    tiles.length = word.length;
    for (let i = 0; i < word.length; i++) {
      let temp = tiles;
      temp[i].x = 3 + i;
      temp[i].y = 5;
      this.setState({...this.state, tiles: temp });
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
    // results = [...new Set(results)].sort((a, b) => b.length - a.length);
    results = Object.keys(this.state.dictionary);

    this.setState({...this.state, matches: results, remainingMatches: results });
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
    let audio = new Audio(`${sound}`);
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
    // let dictionaries = Object.keys(Dictionary);
    let dictionaries = Dictionary.lines;
    let shuffledArray = this.shuffleArray(dictionaries);
    // return Dictionary.lines[shuffledArray[0]];

    return shuffledArray[0];
  };

  // get random word from dictionary with length of n
  getWordFromDictionary = lengthOfWord => {
    let words = Object.keys(this.state.dictionary);
    let arrayOfNLengthStrings = words.filter(
        word => !this.state.foundWords.includes(word)
    );
    let shuffledArray = this.shuffleArray(arrayOfNLengthStrings);
    return shuffledArray[0];
  };

  // get a word
  getWord = () => {
    let wordLength = this.state.wordLength;
    let word = this.getWordFromDictionary(wordLength);
    console.log("chosen word: " + word);
    word = this.shuffleArray(word.split("")).join("");
    for (let i = 0; i < word.length; i++) {
      console.log("letter: " +word[i]);
      this.resetTiles();
      let temp = this.state.tiles;
      temp[i].letter = word[i].toLowerCase();
      this.setState({...this.state, tiles: temp });
    }
    return word;
  };

  // start gameloop
  startGameLoop = () => {
    let newWord = this.getWord();
    console.log("new word: " + newWord);
    this.resetTilePositions(newWord);
    this.generateMatches(newWord);
    this.setState({...this.state,isInGameLoop: true, foundWords: [], wordLength: newWord.length, word: newWord},
        () => { console.log("length set to: "+ newWord.length + " word is: " + newWord);
    });
    this.playSound("woodshuffle.mp3");
  };

  // reset tiles to starting positions
  resetTiles = () => {
    this.setState({...this.state, tiles: this.state.startingTiles });
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

    if (isValid && !this.state.foundWords.includes(word) && this.state.remainingMatches.length > 1) {
      // if a valid word is found
      this.playSound("success.mp3");
      this.addWordToFoundWords(word);
      this.startGameLoop();
      this.addWordToFoundWords(word);

    } else if (
        isValid &&
        !this.state.foundWords.includes(word) &&
        word.length === this.state.wordLength
    ) {
      let newDictionary = this.getNewDictionary();
      this.setState({...this.state,dictionary: newDictionary}
          ,  () => { console.log(this.state.dictionary);
          });

      // if the longest word is found
      this.addWordToFoundWords(word);
      this.playSound("cheering.wav");
      this.setState({...this.state, completed:true});
    }
  };

  // if the longest word is found
  handleLongestWordFound = () => {
    this.setState({...this.state, titleClass: "app-title animated tada" });
    setTimeout(() => this.setState({...this.state, titleClass: "app-title" }), 1500);
  };

  // add a word to FoundWords
  addWordToFoundWords = word => {
    let newFoundWords = this.state.foundWords;
    newFoundWords.push(word);
    this.setState({...this.state, foundWords: newFoundWords });
    this.removeFromRemaining(word);
  };

  // remove word from remaining matches
  removeFromRemaining = word => {
    let array = this.state.remainingMatches;
    let index = array.indexOf(word);
    if (index > -1) {
      array.splice(index, 1);
      this.setState({...this.state, remainingMatches: array });
    }
  };

  // check for words in matrix
  checkForWords = () => {
    let capturedTiles = [];
    let tiles = this.state.tiles;
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].y === 3) {
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
    this.setState({...this.state, tiles: stateTiles });
    this.playSound("wood3.mp3");
  };

  render() {

    return (
        <MyContext.Consumer>
          {context => (
              this.state.completed ?
                  <ImagesProvider {...this.props}
                                  r={require.context("../../Menu/images/", false, /\.(png|jpe?g|svg)$/)}>
                    <Win currentImage={this.props.currentImage}/>
                  </ImagesProvider>
                  :
              <div>
                <Scoreboard
                    isInGameLoop={this.state.isInGameLoop}
                    foundWords={this.state.foundWords}
                    remainingMatches={this.state.remainingMatches}/>
                <Game>
                  <div>
                    <Board
                        tiles={this.state.tiles}
                        updateTiles={this.updateTiles}
                        isInGameLoop={this.state.isInGameLoop}
                        checkForWords={this.checkForWords}
                        tileClass={this.state.tileClass}
                        startGameLoop={this.startGameLoop}
                        wordLength={this.state.wordLength}
                    />
                  </div>
                </Game>
              </div>
          )}
        </MyContext.Consumer>
    );
  }
};
export default Puzzle;