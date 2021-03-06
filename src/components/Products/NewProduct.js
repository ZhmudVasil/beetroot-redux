import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { saveNewProduct } from "../../ducks/products";
import ProductForm from "./ProductsForm";

class NewProduct extends React.Component {
  render() {
    return (
      <div>
        <h1>NewProduct</h1>

        <ProductForm
          product={{ name: "", description: "" }}
          saveProduct={this.props.saveNewProduct}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {
    saveNewProduct
  }
)(withRouter(NewProduct));
