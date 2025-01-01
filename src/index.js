import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './i18n/config';

import './index.css';
import App from './App';
import {store} from './store/store';
import {Snowfall} from 'react-snowfall';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
                <Snowfall
                    snowflakeCount={200}
                    style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10}}
                />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
