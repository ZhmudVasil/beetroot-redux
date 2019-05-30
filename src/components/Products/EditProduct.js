import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchProduct,
  productSelector,
  isLoadingSelector,
  saveProduct,
  deleteProduct
} from "../../ducks/products";
import ProductForm from "./ProductsForm";
import "./Products.css";

class EditProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }
  deleteCurrentProduct = () => {
    this.props.deleteProduct(this.props.product).then(isDeleted => {
      if (isDeleted) this.props.history.push("/products");
    });
  };
  render() {
    const { product, isLoading, saveProduct } = this.props;

    if (isLoading) return <div>Loading....</div>;

    if (!product) return null;

    return (
      <div key={product.id}>
        <h1>
          Edit
          <div>{product.name}</div>
        </h1>

        <ProductForm product={product} saveProduct={saveProduct} />

        <button className="editProduct-btn" onClick={this.deleteCurrentProduct}>
          delete this products
        </button>
      </div>
    );
  }
}

export default connect(
  state => ({
    product: productSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  {
    fetchProduct,
    saveProduct,
    deleteProduct
  }
)(withRouter(EditProduct));
