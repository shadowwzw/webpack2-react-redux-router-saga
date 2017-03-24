import React from 'react';
import App from './App';
import { Router, Route, IndexRoute, Link} from 'react-router'
import { createHistory, useBasename } from 'history'

import config from '../config';

const browserHistory = useBasename(createHistory)({
  basename: config.rootPath,
})

const Root = (props) => (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        
      </Route>
      <Route path="about" component={()=> <h1>Hi there!!!</h1>} />
    </Router>
    )
export default Root;