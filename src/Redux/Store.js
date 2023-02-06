import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";

import rootReducer from "./Reducers/RootReducer";
import rootSaga from "./Sagas/index";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const history = createBrowserHistory();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export default store;