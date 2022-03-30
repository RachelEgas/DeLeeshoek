import React from 'react';
import SpellGame from "../../../features/Games/Puzzle/SpellGame";
import {shallow} from "enzyme";

const wrapper = shallow(<SpellGame bookNumber="1" currentImage="../../../features/Menu/images/line1.png" />);
const instance = wrapper.instance();
const word = 'mug';

it("Test resetTilePositions", () => {
    expect(wrapper.state('tiles').length).toBe(4);

    instance.resetTilePositions(word);

    expect(wrapper.state('tiles').length).toBe(word.length);
});

it("Test generateMatches", () => {
    expect(wrapper.state('matches').length).toBe(0);

    instance.generateMatches(word);

    expect(wrapper.state('matches').length).toBe(2);
    expect(wrapper.state('remainingMatches').length).toBe(2);
});

it("Test getNewDictionary", () => {
    let stateBeforeShuffle = wrapper.state('dictionary');
    let newState = instance.getNewDictionary();

    expect(stateBeforeShuffle).not.toBe(newState);
});

it("Test getWordFromDictionary", () => {
    let dictionary = wrapper.state('dictionary');
    let wordFromDictionary = instance.getWordFromDictionary();

    expect(Object.keys(dictionary)).toContain(wordFromDictionary);
});

it("Test getWord", () => {
    let wordBefore = wrapper.state('word');

    let word = instance.getWord();

    expect(wrapper.state('tiles').length).toBe(wrapper.state('startingTiles').length);
    expect(wordBefore).not.toBe(word);

    const arr1 = wordBefore.split('');
    const arr2 = word.split('');

    const containsAll = arr1.every(element => {
        return arr2.includes(element);
    });

    expect(containsAll).not.toBeTruthy();
});

it("Test startGameLoop", () => {
    instance.startGameLoop(false);

    expect(wrapper.state('isInGameLoop')).toBeTruthy();
    expect(wrapper.state('foundWords')).toStrictEqual([]);
    expect(wrapper.state('wordLength')).toBe(wrapper.state('word').length);
});

it("Test handleValidityCheckWithValidWord", () => {
    instance.handleValidityCheck(true, word, false);
    expect(wrapper.state('isInGameLoop')).toBeTruthy();
    expect(wrapper.state('foundWords').length).toBeGreaterThanOrEqual(1);
});

it("Test handleValidityCheckWithInvalidWord", () => {
    let foundWordsBefore = wrapper.state('foundWords').length;
    instance.handleValidityCheck(false, word, false);
    expect(wrapper.state('foundWords').length).toBe(foundWordsBefore);
});

it("Test addWordToFoundWords", () => {
    instance.addWordToFoundWords(word);
    expect(wrapper.state('foundWords').includes(word)).toBeTruthy();
});

it("Test removeFromRemaining", () => {
    instance.removeFromRemaining('vis');
    expect(wrapper.state('remainingMatches').includes(word)).not.toBeTruthy();
});