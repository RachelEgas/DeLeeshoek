import React from "react";

import { DragSource, DropTarget } from "react-dnd";

const SQUARE_SIZE = 70;
const TILE_OFFSET = 3;

const tileSource = {
    beginDrag(props) {
        return props;
    }
};

const tileTarget = {
    drop(props, monitor) {
        const tile1 = props;
        const tile2 = monitor.getItem();

        props.onDrop(tile1, tile2);
        props.onDrop(tile2, tile1);
    }
};

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

const dropTargetBined = DropTarget("tile", tileTarget, collectDrop);
const dragSoureBined = DragSource("tile", tileSource, collectDrag);

class Tile extends React.Component {
    render() {
        const {
            connectDropTarget,
            connectDragSource,
            isDragging,
            letter,
            x,
            y
        } = this.props;

        const styles = {
            left: x * SQUARE_SIZE - TILE_OFFSET,
            top: y * SQUARE_SIZE - TILE_OFFSET,
            zIndex: `${x + 1}${y + 1}`,
            opacity: isDragging ? 0.5 : 1
        };

        return connectDropTarget(
            connectDragSource(
                <div className={this.props.tileClass} style={styles}>
                    <span className="tile-letter">{letter}</span>
                    <span className="tile-points">{this.props.scoreHash[letter.toLowerCase()].points ? this.props.scoreHash[letter.toLowerCase()].points : 0}</span>
                </div>
            )
        );
    }
}

export default dropTargetBined(dragSoureBined(Tile));