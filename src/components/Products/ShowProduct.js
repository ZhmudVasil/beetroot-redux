import React from "react";
import { connect } from "react-redux";
import {
  fetchProduct,
  productSelector,
  isLoadingSelector
} from "../../ducks/products";
import "./Products.css";

class ShowProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }
  render() {
    const { one, isLoading } = this.props;

    if (isLoading) return <div>Loading....</div>;

    if (!one) return null;

    return (
      <div className="showProduct-form">
        <h1>{one.name}</h1>
      </div>
    );
  }
}
export default connect(
  state => ({
    one: productSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { fetchProduct }
)(ShowProduct);
