import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers'
import initialState from "./store/initialState";
import "./index.css";
import App from "./App";

const store = createStore(allReducers, 
  initialState, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
