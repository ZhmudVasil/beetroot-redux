import { createStore, applyMiddleware, compose } from "redux";

import reducer from "./ducks/index";
import ReduxThunk from "redux-thunk";
import api from "./api/index";

// const saveToLocalStorage = store => next => action => {
//   // console.log("dispatching", action);
//   let result = next(action);
//   // console.log("next state", store.getState());
//   window.localStorage.setItem("state", JSON.stringify(store.getState()));
//   return result;
// };

// const storedValue = localStorage.getItem("state");
// const initialState = storedValue ? JSON.parse(storedValue) : undefined;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk.withExtraArgument({ api })))
);

window.store = store;
export default store;
