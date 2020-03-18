import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import 'antd/dist/antd.css'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

ReactDOM.render(
<Provider 
store ={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)}
>
    <App />
</Provider>

    
    , document.getElementById('root'));


serviceWorker.unregister();
