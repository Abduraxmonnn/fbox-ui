import {createStore, compose, applyMiddleware} from "redux";
import {thunk} from "redux-thunk";

import reducers from "./index";

let isDev = true

const composeEnhancers = isDev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);
