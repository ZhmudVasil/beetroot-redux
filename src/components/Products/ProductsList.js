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
        <h2>
          <Link to={"/products/new"}>Add new item</Link>
        </h2>

        {isLoading && <div>Loading...</div>}

        {list.map(item => (
          <div key={item.id}>
            <Link to={`/products/${item.id}`}>{item.name}</Link>
            {"  "}
            {<Link to={`/products/${item.id}/edit`}>Edit</Link>}
          </div>
        ))}
        <div>
          {pages.map(p => (
            <Link key={p} to={`/products?page=${p}`}>
              {p}
            </Link>
          ))}
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
