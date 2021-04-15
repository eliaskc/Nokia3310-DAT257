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
        <Button onClick={() => this.clickMe("Hello world: 2")}>Arvid</Button>
        <Button onClick={() => this.clickMe("Hello world: 3")}>Lisa</Button>
        <Button onClick={() => this.clickMe("Hello world: 4")}>Elias H</Button>
        <Button onClick={() => this.clickMe("Hello world: 5")}>Elias KC</Button>
        <Button onClick={() => this.clickMe("Hello world: 6")}>Astrid</Button>
        </header>
      </div>
    );
  }
}

export default App;
