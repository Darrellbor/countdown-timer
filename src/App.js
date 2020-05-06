import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

//Pages
import Countdown from "./containers/Countdown";

function App() {
  return (
    <div className="Countdown-App">
      <Switch>
        <Route path="/" exact component={Countdown} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
