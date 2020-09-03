import 'core-js/es6/string';
import 'core-js/es6/array';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/object';
import 'core-js/es6/promise';
import 'core-js/es7/object';
import 'core-js/es7/array';
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import configureStore from './store/store';
import {BrowserRouter} from "react-router-dom";
import './i18n';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
