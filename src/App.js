import React, { createContext, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import useRouter from "./hooks/useRouter";
import Intro from "./features/Intro/Intro";
import { ImagesProvider } from "./contexts/ImagesContext";
import Board from "./features/Games/Puzzle/Board.js";
import bg from "./contexts/images/bg.png";
import GameContainer from "./features/Menu/GameContainer";

const MyContext = createContext({});

class MyProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            bg:bg,
            selectedSeries: 0,
            selectedLine: 0
        });
    }

    // callback for context to change series
    handleSeriesChange = (chosenSeries) => {
        this.setState({selectedSeries: chosenSeries}, () => { console.log(this.state.selectedSeries);})
    };

    // callback for context to change line
    handleLineChange = (chosenLine) => {
        this.setState({selectedLine: chosenLine}, () => { console.log(this.state.selectedLine);})
    };

    render() {
        return (
            <MyContext.Provider value={{
                    state: this.state,
                    handleSeriesChange: this.handleSeriesChange,
                    handleLineChange: this.handleLineChange
                }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

const App = (props) => {

    // added default value to location because jest returns null on userRouter()
  const { location } = useRouter() || { location: { pathname: '' } };
  
  const transitions = useTransition(location, location => location.pathname, {
    from: {
      opacity: location.pathname !== "/" ? 0 : 1,
      transform: "translateX(0%)"
    },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-20%)", delay: 0 }
  });
  return (
    <MyProvider>
        <div style={{ display: 'none' }}>test header</div>

        <MyContext.Consumer>
            { (context) => (
                <div>
                    {transitions.map(({item, props, key}) => (
                        <animated.div key={key} style={props}>
                            <Suspense fallback={""}>
                                <Switch location={item}>
                                    <Route path="/serie1" exact render={props => (
                                        <ImagesProvider {...props}
                                            r={require.context("./features/Menu/images/", false, /\.(png|jpe?g|svg)$/)}>
                                            <GameContainer timestamp={new Date().toString()} {...props} />
                                        </ImagesProvider>
                                    )}/>
                                    <Route path="/serie2" exact render={props => (
                                        <ImagesProvider
                                            r={require.context("./contexts/images/", false, /\.(png|jpe?g|svg)$/)}>
                                            <Board {...props} />
                                        </ImagesProvider>
                                    )}/>
                                    <Route path="/serie3" exact render={props => (
                                        <ImagesProvider
                                            r={require.context("./contexts/images/", false, /\.(png|jpe?g|svg)$/)}>
                                            <Board {...props} />
                                        </ImagesProvider>
                                    )}/>
                                    <Route
                                        path="/"
                                        exact
                                        render={props => (
                                            <ImagesProvider
                                                intro={true}
                                                r={require.context(
                                                    "./features/Intro/images/",
                                                    false,
                                                    /\.(png|jpe?g|svg)$/
                                                )}
                                            >
                                                <Intro {...props} />
                                            </ImagesProvider>
                                        )}
                                    />
                                    <Redirect to="/"/>
                                </Switch>
                            </Suspense>
                        </animated.div>
                    ))
                    }
              </div>
            )}
        </MyContext.Consumer>
    </MyProvider>
  );
}

// export app component
export default App;

// export context
export { MyContext };
