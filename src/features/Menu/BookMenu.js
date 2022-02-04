import {MyContext} from "../../App";
import {Game, GameHeader, Menu, Nav} from "../../common/styles";
import React from "react";
import BookMenuItem from "./BookMenuItem";
import Puzzle from "../Games/Puzzle/Puzzle";
import {WinContainer} from "../Games/Puzzle/styles";
import {ImagesProvider} from "../../contexts/ImagesContext";

class BookMenu extends React.Component {
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

    menuItemOnClick = (bookNumber,imgSrc) => {
        this.setState({
            bookChosen: true,
            bookNumber: bookNumber,
            currentImage: imgSrc
        });
    }

    getAllFromDir = (r) => {
        return r.keys().map((item, index) => <BookMenuItem itemOnClick={this.menuItemOnClick} key={index} src={item}></BookMenuItem>);
    };

    render() {

        const elements = this.getAllFromDir(require.context('./images', false, /\.(png|jpe?g|svg)$/));

        return (
            <MyContext.Consumer>
                {context => (
                    <GameHeader bg={context.state.bg} size="400px" filter="1">

                        <Nav type="back" to={this.state.bookChosen ? "/serie1":"/"}/>
                        {
                            this.state.bookChosen ?
                                    <Puzzle bookNumber={this.state.bookNumber} currentImage={this.state.currentImage}/>
                                :
                                <Menu > {elements} </Menu>
                        }
                    </GameHeader>
                )}
            </MyContext.Consumer>
        );
    }
};
export default BookMenu;