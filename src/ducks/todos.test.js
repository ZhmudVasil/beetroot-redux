import reducer, {
  changeNewItemText,
  defaultState,
  deleteItem,
  changeItemIsDone,
  changeItemText,
  addNewItem
} from "./todos.js";

import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

describe("changeNewItemText", () => {
  it("works changeNewItemText", () => {
    const text = "some notes";
    const state = reducer(defaultState, changeNewItemText(text));
    expect(state).toEqual({
      ...defaultState,
      newItemText: text
    });
  });
});

describe("deleteItem", () => {
  it("works deleteItem", async () => {
    const stateWithItem = {
      ...defaultState,
      items: [
        {
          id: 1,
          text: "buy milk",
          isDone: true
        },
        {
          id: 2,
          text: "go home",
          isDone: false
        }
      ]
    };

    const api = {
      todos: {
        deleteItem: () => Promise.resolve()
      }
    };

    const store = createStore(
      reducer,
      stateWithItem,
      applyMiddleware(ReduxThunk.withExtraArgument({ api }))
    );

    await store.dispatch(deleteItem(1));

    const nextstate = store.getState();

    expect(nextstate).toEqual({
      ...defaultState,
      items: [
        {
          id: 2,
          text: "go home",
          isDone: false
        }
      ]
    });
  });
});

describe("changeItemText", () => {
  it("works changeItemText", () => {
    const text = "some notes";
    const id = 2;
    const stateWithItem = {
      ...defaultState,
      items: [
        {
          id: 1,
          text: "buy milk",
          isDone: true
        },
        {
          id: 2,
          text: "go home",
          isDone: false
        }
      ]
    };
    const state = reducer(stateWithItem, changeItemText(id, text));
    expect(state).toEqual({
      ...defaultState,
      items: state.items.map(item => {
        if (item.id === id) {
          return {
            id: 2,
            text: text,
            isDone: false
          };
        }

        return {
          id: 1,
          text: "buy milk",
          isDone: true
        };
      })
    });
  });
});

describe("changeItemIsDone", () => {
  it("works changeItemIsDone", () => {
    const id = 2;
    const stateWithItem = {
      ...defaultState,
      items: [
        {
          id: 1,
          text: "buy milk",
          isDone: true
        },
        {
          id: 2,
          text: "go home",
          isDone: false
        }
      ]
    };
    const state = reducer(stateWithItem, changeItemIsDone(id, true));

    expect(state).toEqual({
      ...stateWithItem,
      items: [
        {
          id: 1,
          text: "buy milk",
          isDone: true
        },
        {
          id: 2,
          text: "go home",
          isDone: true
        }
      ]
    });
  });
});

// describe("addNewItem", () => {
//   it("works addNewItem", async () => {
//     const stateWithItem = {
//       ...defaultState,
//       items: [
//         {
//           id: 1,
//           text: "buy milk",
//           isDone: true
//         },
//         {
//           id: 2,
//           text: "go home",
//           isDone: false
//         }
//       ]
//     };

//     const newItem = {
//       id: 3,
//       text: "some notes",
//       isDone: false
//     };

//     const api = {
//       todos: {
//         addNewItem: newItem => Promise.resolve(...stateWithItem, newItem)
//       }
//     };

//     const store = createStore(
//       reducer,
//       stateWithItem,
//       applyMiddleware(ReduxThunk.withExtraArgument({ api }))
//     );

//     await store.dispatch(addNewItem());

//     const nextstate = store.getState();

//     expect(nextstate).toEqual({
//       ...defaultState,
//       items: [
//         {
//           id: 1,
//           text: "buy milk",
//           isDone: true
//         },
//         {
//           id: 2,
//           text: "go home",
//           isDone: false
//         }
//       ]
//     });
//   });
// });
