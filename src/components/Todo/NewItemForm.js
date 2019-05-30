import React from "react";
import { connect } from "react-redux";
import { changeNewItemText, addNewItem } from "../../ducks/todos";
import "./Todo.css";

const NewItemForm = ({ newItemText, changeNewItemText, addNewItem }) => {
  return (
    <form
      className="todoNewItemForm"
      onSubmit={e => {
        e.preventDefault();
        addNewItem();
      }}
    >
      <input
        className="todoNewItemForm-text"
        type="text"
        value={newItemText}
        onChange={e => changeNewItemText(e.target.value)}
      />
      <button
        className="todoNewItemForm-btn"
        onClick={e => {
          e.preventDefault();
          addNewItem();
        }}
      >
        ADD
      </button>
    </form>
  );
};

export default connect(
  ({ todos }) => ({
    newItemText: todos.newItemText
  }),
  { changeNewItemText, addNewItem }
)(NewItemForm);
