import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

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
        <img src="/hamncafeet-logo.jpeg" alt="Hamncafeet logga" />
        {this.state.message}
        <button onClick={() => this.clickMe("Hello world: 1")}>namn1</button>
        <button onClick={() => this.clickMe("Hello world: 2")}>namn2</button>
        <button onClick={() => this.clickMe("Hello world: 3")}>Lisa</button>
        <button onClick={() => this.clickMe("Hello world: 4")}>Elias H</button>
        <button onClick={() => this.clickMe("Hello world: 5")}>Elias KC</button>
        </header>
      </div>
    );
  }
}

export default App;
