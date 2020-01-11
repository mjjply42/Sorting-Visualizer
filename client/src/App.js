import React from 'react';
import { NavBar } from './components/NavBar.js'
import { MainArea } from './components/MainArea.js'
import { Provider } from "react-redux";
import store from "./store";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar/>
        <MainArea/>
      </div>
    </Provider>
  );
}

export default App;
