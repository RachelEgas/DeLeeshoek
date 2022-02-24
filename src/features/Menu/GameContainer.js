import {MyContext} from "../../App";
import {GameHeader, Menu} from "./styles";
import {Nav} from "../../common/styles"
import React from "react";
import MenuItem from "./MenuItem";
import SpellGame from "../Games/Puzzle/SpellGame";

class GameContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = (
            {
                bookChosen: false,
                bookNumber: null,
                currentImage: null
            }
        );
    }

    resetState = () => {
        this.setState({bookChosen: false, bookNumber: null, currentImage: null})
    }

    menuItemOnClick = (bookNumber,imgSrc) => {
        this.setState({
            bookChosen: true,
            bookNumber: bookNumber,
            currentImage: imgSrc
        });
    }

    getAllFromDir = (r) => {
        return r.keys().map((item, index) => <MenuItem itemOnClick={this.menuItemOnClick} key={index} src={item}></MenuItem>);
    };

    render() {

        const elements = this.getAllFromDir(require.context('./images', false, /\.(png|jpe?g|svg)$/));

        return (
            <MyContext.Consumer>
                {context => (
                    <GameHeader bg={context.state.bg} size="400px" filter="1">

                        <Nav resetBase={this.resetState} type="back" to={this.state.bookChosen ? "/serie1":"/"}/>
                        {
                            this.state.bookChosen ?
                                    <SpellGame bookNumber={this.state.bookNumber} currentImage={this.state.currentImage}/>
                                :
                                <Menu > {elements} </Menu>
                        }
                    </GameHeader>
                )}
            </MyContext.Consumer>
        );
    }
};
export default GameContainer;