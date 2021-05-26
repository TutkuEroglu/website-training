import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import allReducers from "./reducer/index";
import { Provider } from "react-redux";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();


const store = createStore(
  allReducers,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
