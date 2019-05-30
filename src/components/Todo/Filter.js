import React from "react";

import { connect } from "react-redux";
import {
  showActive,
  showAll,
  showDone,
  fetchList,
  filteredTodosSelector
} from "../../ducks/todos";

import "./Todo.css";

function Filter({ number, showActive, showAll, showDone, fetchList }) {
  return (
    <div className="todoFilter">
      <i className="todoFilter-count">
        {number}
        <span className="todoFilter-counts">elements</span>
      </i>
      <button className="todoFilter-btn" onClick={showActive}>
        {" "}
        showActive{" "}
      </button>
      <button className="todoFilter-btn" onClick={showAll}>
        {" "}
        showAll{" "}
      </button>
      <button className="todoFilter-btn" onClick={showDone}>
        {" "}
        showDone{" "}
      </button>
      <div>
        <button className="todoFilter-btn" onClick={fetchList}>
          {" "}
          load todos{" "}
        </button>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    number: filteredTodosSelector(state).length
  }),
  { showActive, showAll, showDone, fetchList }
)(Filter);
