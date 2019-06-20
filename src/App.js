import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import "./App.css";

import Counter from "./components/Counter";
import Todo from "./components/Todo";
import ProductsList from "./components/Products/ProductsList";
import ShowProduct from "./components/Products/ShowProduct";
import EditProduct from "./components/Products/EditProduct";
import NewProduct from "./components/Products/NewProduct";
import Login from "./components/Login";
// import Logout from "./components/Logout";

import requireAuth from "./components/requireAuth";

function App() {
  return (
    <div className="App">
      <h1>Our apps</h1>
      <Router>
        {localStorage.getItem("token") ? (
          <Link className="nav-link-auth" to="/login">
            logout
          </Link>
        ) : (
          <Link className="nav-link-auth" to="/login">
            login
          </Link>
        )}
        {/* <Link className="nav-link-auth" to="/login">
          login
        </Link> */}
        {/* <Link className="nav-link-auth" to="/logout">
          logout
        </Link> */}
        <nav className="nav-form">
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
          <Route path="/login" component={Login} />
          {/* <Route path="/logout" component={Logout} /> */}
          <Route path="/todo" component={requireAuth(Todo)} />
          <Route path="/counter" component={Counter} />
          <Redirect exact from="/" to="/todo" />

          <Route path="/products/new" component={requireAuth(NewProduct)} />
          <Route
            path="/products/:id/edit"
            component={requireAuth(EditProduct)}
          />
          <Route path="/products/:id" component={requireAuth(ShowProduct)} />
          <Route path="/products" component={requireAuth(ProductsList)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
