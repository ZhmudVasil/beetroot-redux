import React from "react";
import { connect } from "react-redux";
import {
  changeItemIsDone,
  changeItemText,
  deleteItem,
  filteredTodosSelector,
  isLoadingSelector
} from "../../ducks/todos";

class List extends React.Component {
  render() {
    const {
      list,
      changeItemIsDone,
      changeItemText,
      deleteItem,
      isLoading
    } = this.props;

    return (
      <div>
        {isLoading && "Loading..."}
        {list.map(item => (
          <div
            key={item.id}
            style={{
              textDecoration: item.isDone ? "line-through" : "none",
              color: item.isDone ? "gray" : "black"
            }}
          >
            <input
              type="checkbox"
              checked={item.isDone}
              onChange={e => changeItemIsDone(item.id, e.target.checked)}
            />

            <input
              type="text"
              value={item.text}
              onChange={e => changeItemText(item.id, e.target.value)}
            />
            {item.text}
            <input
              type="submit"
              value="x"
              onClick={() => deleteItem(item.id)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    list: filteredTodosSelector(state),
    isLoading: isLoadingSelector(state)
  }),
  { changeItemIsDone, changeItemText, deleteItem }
)(List);

// changeItemIsDone = function (...args) {
//   return store.dispatch(changeItemIsDone(...args))
// }
