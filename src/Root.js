import React from 'react';
import App from './App';
import {Router, Route} from 'react-router'
import {createHistory, useBasename} from 'history'

import config from '../config/user';

const browserHistory = useBasename(createHistory)({
    basename: config.rootPath,
});

const Root = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>

        </Route>
        <Route path="about" component={() => <h1>Hi there!!!</h1>}/>
    </Router>
);
export default Root;