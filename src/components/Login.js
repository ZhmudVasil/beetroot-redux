import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login, logout } from "../ducks/auth";
import { withRouter } from "react-router-dom";
import "./Login.css";

function Login({ login, logout, history }) {
  if (localStorage.getItem("token")) {
    return (
      <div>
        <h1>Login</h1>
        <button className="loginForm-btn" onClick={logout}>
          Logout
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Login</h1>
        <Formik
          initialValues={{ login: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.login) {
              errors.login = "Required";
            } else if (!/^[A-Z0-9._%+-]/i.test(values.login)) {
              errors.login = "Invalid login";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await login(values.login, values.password);
            setSubmitting(false);
            history.push("/products");
          }}
        >
          {({ isSubmitting }) => (
            <Form className="loginForm">
              <div className="loginForm-item">
                <label className="loginForm-label">login</label>
                <Field className="loginForm-field" type="text" name="login" />
                <ErrorMessage name="login" component="div" />
              </div>

              <div className="loginForm-item">
                <label className="loginForm-label">password</label>
                <Field
                  className="loginForm-field"
                  type="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" />
              </div>

              <button
                className="loginForm-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { login, logout }
  )(Login)
);
