// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import {BrowserRouter} from 'react-router-dom'
// import { Provider } from "react-redux";
// import { createStore, compose, applyMiddleware } from "redux";
// import {thunk} from 'redux-thunk';
//
// import './index.css'
// import App from './App'
// import reducers from "./reducers"
// import "./index.css";
//
// const store = createStore(reducers, compose(applyMiddleware(thunk)));
//
// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//     <Provider store={store}>
//         <React.StrictMode>
//             <BrowserRouter>
//                 <App/>
//             </BrowserRouter>
//         </React.StrictMode>
//     </Provider>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';

import './index.css';
import App from './App';
import reducers from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
