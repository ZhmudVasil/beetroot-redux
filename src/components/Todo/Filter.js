import React from "react";

import { connect } from "react-redux";
import {
  showActive,
  showAll,
  showDone,
  fetchList,
  filteredTodosSelector
} from "../../ducks/todos";

function Filter({ number, showActive, showAll, showDone, fetchList }) {
  return (
    <div>
      {number}
      <button onClick={showActive}> showActive </button>
      <button onClick={showAll}> showAll </button>
      <button onClick={showDone}> showDone </button>
      <div>
        <button onClick={fetchList}> load todos </button>
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
