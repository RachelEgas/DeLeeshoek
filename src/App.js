import React, { createContext, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import useRouter from "./hooks/useRouter";
import Intro from "./features/Intro/Intro";
import Puzzle from "./features/Games/Puzzle/Puzzle";
import { ImagesProvider } from "./contexts/ImagesContext";
import Board from "./features/Games/Puzzle/Board";
import bg from "./contexts/images/bg.png";
import BookMenu from "./features/Menu/BookMenu";

const Shop = React.lazy(() => {
  return import("./features/Shop/Shop");
});

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
  const { location } = useRouter();
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
                                            <BookMenu timestamp={new Date().toString()} {...props} />
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
                                        path="/shop"
                                        exact
                                        render={props => (
                                            <ImagesProvider
                                                r={require.context(
                                                    "./features/Shop/images/",
                                                    true,
                                                    /\.(png|jpe?g|svg)$/
                                                )}
                                            >
                                                <Shop {...props} />
                                            </ImagesProvider>
                                        )}
                                    />
                                    <Route
                                        path="/puzzle"
                                        exact
                                        render={props => (
                                            <ImagesProvider
                                                r={require.context(
                                                    "./contexts/images/",
                                                    false,
                                                    /\.(png|jpe?g|svg)$/
                                                )}
                                            >
                                                <Puzzle {...props} />
                                            </ImagesProvider>
                                        )}
                                    />
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
