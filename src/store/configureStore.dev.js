import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

// then run the saga
// sagaMiddleware.run(mySaga)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}