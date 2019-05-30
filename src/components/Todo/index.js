import React from "react";
import { connect } from "react-redux";
import { fetchList } from "../../ducks/todos";

import "./Todo.css";

import NewItemForm from "./NewItemForm";
import List from "./List";
import Filter from "./Filter";

class Todo extends React.Component {
  componentDidMount() {
    this.props.fetchList();
  }
  render() {
    return (
      <div className="todo">
        <h1>TODO</h1>
        <div className="todoForm">
          <NewItemForm />
          <List />
          <Filter />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchList }
)(Todo);
