import React, { Component } from 'react';
import style from './App.css';
import logo from 'file-loader!./logo.svg';

class App extends Component {
  render() {
    return (
      <div className={style.App}>
        <div className={style['App-header']}>
          <img src={logo} className={style['App-logo']} alt="logo" />
          <h2>Welcome to React!</h2>
        </div>
        <p className={style['App-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

