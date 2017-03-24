import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import Root from './Root';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// relative path
import reducer from './reducers'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
// sagaMiddleware.run(mySaga)

const renderAll = (Root) => render(
	(<Provider store={store}>
  		<Root/>
  	</Provider>),
  document.getElementById('root')
);

module.hot.accept('./Root', () => {
	const Root = require('./Root').default;
	renderAll(Root);
});

renderAll(Root);

