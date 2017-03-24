import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import Root from './Root';
import configureStore from './store/configureStore';
import DevTools from './containers/DevTools';

const store = configureStore();

const renderAll = (Root) => render(
    (<Provider store={store}>
        <div>
            <Root/>
            <DevTools/>
        </div>
    </Provider>),
  document.getElementById('root')
);

module.hot.accept('./Root', () => {
    const Root = require('./Root').default;
    renderAll(Root);
});

renderAll(Root);

// const func11 = function* func1(){
//  console.log("generator!!!111")
// }
// func11().next();

// (async function func222(){
//  await console.log("async func!!!!")
// })();
