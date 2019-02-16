import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, combineReducers } from "redux";

import registerServiceWorker from './registerServiceWorker';
import config from "./config";
import App from './App';
import userProfileReducer from './store/reducers/userProfile';
import albumReducer from './store/reducers/album';

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  album: albumReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers()
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();