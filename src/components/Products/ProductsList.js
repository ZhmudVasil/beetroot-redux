import React from "react";
import { connect } from "react-redux";
import {
  productsSelector,
  isLoadingSelector,
  fetchProducts,
  totalPageSelector
} from "../../ducks/products";
import { Link } from "react-router-dom";
import qs from "query-string";
import "./Products.css";

class ProductsList extends React.Component {
  componentDidMount() {
    const page = this.getPageNumber(this.props);
    this.props.fetchProducts(page);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevPage = this.getPageNumber(prevProps);
    const page = this.getPageNumber(this.props);
    if (page !== prevPage) {
      this.props.fetchProducts(page);
    }
  }
  getPageNumber = props => Number(qs.parse(props.location.search).page || 1);

  render() {
    let pages = new Array(this.props.totalPages)
      .fill(null)
      .map((_v, i) => i + 1);
    const { list, isLoading } = this.props;
    return (
      <div>
        <h1>Products List</h1>
        <div className="productsListForm">
          <h2 className="productList-btnAdd">
            <Link to={"/products/new"}>
              <button className="productsList-btn">Add new item</button>{" "}
            </Link>
          </h2>

          {isLoading && <div>Loading...</div>}
          <div className="productList-itemFotm">
            {list.map(item => (
              <div key={item.id} className="productsList-item">
                <Link to={`/products/${item.id}`}>
                  <span className="productsList-itemName">{item.name}</span>
                </Link>

                {
                  <Link to={`/products/${item.id}/edit`}>
                    <button className="productsList-btn productsList-btnEdit">
                      Edit
                    </button>
                  </Link>
                }
              </div>
            ))}
          </div>
          <hr />
          <div className="productsList-pages">
            {pages.map(p => (
              <Link
                className="productsList-page"
                key={p}
                style={{
                  color: p === this.getPageNumber(this.props) ? "green" : "red"
                }}
                to={`/products?page=${p}`}
              >
                {p}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    list: productsSelector(state),
    isLoading: isLoadingSelector(state),
    totalPages: totalPageSelector(state)
  }),
  { fetchProducts }
)(ProductsList);
