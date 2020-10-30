import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; // middleware to help us debug our code easier that console log our redux flow
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";
import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor};
