import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware);

// then run the saga
// sagaMiddleware.run(mySaga)

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}