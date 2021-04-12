import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      message : "Hello world"
    }
    this.clickMe = this.clickMe.bind(this);
  }

  clickMe(message){
    this.setState({
      message : message
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        {this.state.message}
        <button onClick={() => this.clickMe("Hello world: 1")}>Arvid</button>
        <button onClick={() => this.clickMe("Hello world: 2")}>namn</button>
        </header>
      </div>
    );
  }
}

export default App;
