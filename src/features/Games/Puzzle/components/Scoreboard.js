import React from "react";

// context from provider
import { MyContext } from "../../../../App.js";

class Scoreboard extends React.Component {
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
    render() {
        return (
            <MyContext.Consumer>
                {context => (
                    <div className="scoreboard-wrapper">
                        <div className="scoreboard">
                            <p className="scoreboard-mobile-message animated fadeIn">
                                this game is not yet availible for mobile or touch-screen devices
                            </p>
                            {this.props.isInGameLoop ? (
                                <h2 className="scoreboard-score animated fadeIn">
                                    Score <br /> {this.props.score}
                                </h2>
                            ) : null}

                            {this.props.isInGameLoop ? (
                                <h2 className="scoreboard-found-words animated fadeIn">
                                    Found <br /> {this.props.foundWords.length}
                                </h2>
                            ) : null}

                            {this.props.isInGameLoop ? (
                                <h2 className="scoreboard-words-left animated fadeIn">
                                    Remaining <br />
                                    {this.props.remainingMatches.length}
                                </h2>
                            ) : null}

                                {/*<button*/}
                                {/*    className="scoreboard-surrender-button animated fadeInDown"*/}
                                {/*    onClick={context.endGameLoop}*/}
                                {/*>*/}
                                {/*    Surrender*/}
                                {/*</button>*/}
                        </div>
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}
export default Scoreboard;
