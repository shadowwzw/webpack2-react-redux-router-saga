import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import Root from './Root';
import configureStore from './store/configureStore';

const store = configureStore();

let renderAll;

if (process.env.NODE_ENV === 'production') {
    renderAll = (Root) => render(
        (<Provider store={store}>
            <div>
                <Root/>
            </div>
        </Provider>),
      document.getElementById('root')
    );
} else {
    const DevTools = require('./containers/DevTools').default;
    renderAll = (Root) => render(
        (<Provider store={store}>
            <div>
                <Root/>
                <DevTools />
            </div>
        </Provider>),
      document.getElementById('root')
    );
    module.hot.accept('./Root', () => {
        const Root = require('./Root').default;
        renderAll(Root);
    });
}

renderAll(Root);

// const func11 = function* func1(){
//  console.log("generator!!!111")
// }
// func11().next();

// (async function func222(){
//  await console.log("async func!!!!")
// })();
