import React from "react";

//internal components
import BoardSquare from "./components/BoardSquare.js";
import Tile from "./components/Tile.js";

import { DndProvider  } from "react-dnd-multi-backend";
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
// import { DndProvider  } from "react-dnd";
import FlipMove from "react-flip-move";
import { MyContext } from "../../../App";
import { Grid } from "../styles";
import helpers from "../../../helpers";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 7;

class Board extends React.Component {
    constructor() {
        super();
        this.state = {

        };

        this.updateDroppedTilePosition = this.updateDroppedTilePosition.bind(this);
    }

    componentDidMount() {
        this.props.startGameLoop();
    }

    updateDroppedTilePosition({ x, y }, tile) {
        // Create a copy of the state, find the newly-dropped tile.
        let stateTiles = this.props.tiles.slice();
        const index = stateTiles.findIndex(stateTile => stateTile.id === tile.id);
        // Set it to a new copy of the tile, but with the new coords
        stateTiles[index] = { ...tile, x, y };
        this.props.updateTiles(stateTiles);
        // this.setState({justDropped: true})
        if (this.props.isInGameLoop) {
            this.props.checkForWords();
        }
    }

    renderTiles() {
        return this.props.tiles.map((tile, index) => {
            return (
                <Tile tileClass={this.props.tileClass} justDropped={this.state.justDropped} key={index} onDrop={this.updateDroppedTilePosition} {...tile} />
            );
        });
    }

    renderBoardSquares() {
        // Create a 2D array to represent the board
        // Array#matrix is a monkey patched, custom method >:)
        const matrix = Array.matrix(BOARD_WIDTH, BOARD_HEIGHT);
        return matrix.map((row, rowIndex) =>
            row.map(index => {
                return (
                    <BoardSquare
                        x={index}
                        y={rowIndex}
                        onDrop={this.updateDroppedTilePosition}
                        key={index}
                        isOver={this.props.isOver}
                    />
                );
            })
        );
    }

    render() {
        let largestWordInDictionary = this.props.wordLength;
        console.log(largestWordInDictionary)
        return (
            <MyContext.Consumer>
                {context => (
                    <DndProvider options={ HTML5toTouch }>
                    <div id="scrabble">
                        <div className="board-border">
                                <Grid wordLength={34+largestWordInDictionary}>
                                    <FlipMove duration={1} staggerDelayBy={150}>
                                        {this.renderTiles()}
                                    </FlipMove>
                                    {this.renderBoardSquares()}
                                </Grid>
                        </div>
                    </div>
                    </DndProvider>
                )}
            </MyContext.Consumer>
        );
    }
}

export default Board;
