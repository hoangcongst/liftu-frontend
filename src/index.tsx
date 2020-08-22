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

declare var PUBLIC_URL: string;



const store = configureStore();
const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={basename}>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
