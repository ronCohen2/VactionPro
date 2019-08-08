import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/Reducer/rootReducer";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
export const browserHistory = createBrowserHistory();
const store = createStore(
  rootReducer,
  composeWithDevTools(compose(applyMiddleware(thunk)))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
