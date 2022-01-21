import React from "react";
import { DropTarget } from "react-dnd";
import classNames from "classnames";

const squareTarget = {
    drop(props, monitor) {
        props.onDrop(props, monitor.getItem());
    }
};

const dropTargetBined = DropTarget("tile", squareTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
}));


class BoardSquare extends React.Component {
    renderSquare() {
        const classes = classNames({
            "board-square": true,
            "dragged-over": this.props.isOver
        });

        return <div className={classes} />;
    }

    render() {
        if (this.props.tile) {
            // If this square already has a tile in it, we don't want to allow drops.
            return this.renderSquare();
        } else {
            return this.props.connectDropTarget(this.renderSquare());
        }
    }
}

export default dropTargetBined(BoardSquare);