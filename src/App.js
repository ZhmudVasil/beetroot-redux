import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import "./App.css";

import Counter from "./components/Counter";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/todo">todo</Link> <Link to="/counter">counter</Link>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route path="/todo" component={Todo} />
          <Route path="/counter" component={Counter} />
          <Redirect exact from="/" to="/todo" />
        </Switch>
        {/* <Counter />
      <Todo /> */}
      </Router>
    </div>
  );
}

export default App;
