import React, { Component } from 'react';
import './App.css';
import { Provider } from "react-redux"
import LoginForm from "./components/LoginForm"
import store from "./store/Store" 

class App extends Component {
  render(){
    const Application = (
        <div className="App">
            <Provider store={store}><LoginForm /></Provider>
        </div>
    );
    return Application;
  }
}

export default App;
