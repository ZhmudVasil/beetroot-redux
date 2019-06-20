import React from "react";
import { connect } from "react-redux";
import { logout } from "../ducks/auth";
import { withRouter } from "react-router-dom";
import "./Login.css";

function Logout() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default withRouter(
  connect(
    null,
    { logout }
  )(Logout)
);
