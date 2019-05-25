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
import ProductsList from "./components/Products/ProductsList";
import NewProduct from "./components/Products/NewProduct";
import EditProduct from "./components/Products/EditProduct";
import ShowProduct from "./components/Products/ShowProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Link className="nav-link" to="/todo">
            todo
          </Link>
          <Link className="nav-link" to="/counter">
            counter
          </Link>
          <Link className="nav-link" to="/products">
            products
          </Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route path="/todo" component={Todo} />
          <Route path="/counter" component={Counter} />

          <Redirect exact from="/" to="/todo" />

          <Route path="/products/new" component={NewProduct} />
          <Route path="/products/:id/edit" component={EditProduct} />
          <Route path="/products/:id" component={ShowProduct} />
          <Route path="/products" component={ProductsList} />
        </Switch>
        {/* <Counter />
      <Todo /> */}
      </Router>
    </div>
  );
}

export default App;
