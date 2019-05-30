import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import "./Products.css";

class ProductsForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={this.props.product}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.saveProduct(values).then(product => {
            setSubmitting(false);

            if (product) {
              const url = `/products/${product.id}`;
              this.props.history.push(url);
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="productsForm">
            <div className="productsForm-item">
              <label className="productsForm-label">name</label>
              <Field className="productsForm-field" type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="productsForm-item">
              <label className="productsForm-label">description</label>
              <Field
                className="productsForm-field"
                type="text"
                name="description"
              />
              <ErrorMessage name="description" component="div" />
            </div>

            <button
              className="productsForm-btn"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withRouter(ProductsForm);
