import {createStore, compose, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";

import reducers from "../reducers";
import {APIv1} from "../api";

let isDev = false;

if (APIv1 === "http://127.0.0.1:8000/api/v1"){
    isDev = true
}

const composeEnhancers =
    isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);
