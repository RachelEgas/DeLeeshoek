import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import useRouter from "./hooks/useRouter";
import Intro from "./features/Intro/Intro";
import Shop from "./features/Shop/Shop";


const App = props => {
  const { location } = useRouter();
  const transitions = useTransition(
    location,
    location => location.pathname,
    {
      from: { opacity: location.pathname !== "/" ? 0 : 1, transform: "translateX(0%)" },
      enter: { opacity: 1, transform: "translateX(0%)" },
      leave: { opacity: 0, transform: "translateX(-20%)", delay: 0 }
    }
  );
  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={item}>
        <Route path="/shop" exact component={Shop} />
        <Route path="/" exact component={Intro} />
        <Redirect to="/" />
      </Switch>
    </animated.div>
  ));
};

export default App;

/*
<div>Icons made by <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</NavL></div>
*/