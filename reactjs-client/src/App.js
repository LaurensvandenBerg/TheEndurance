import React, { Component } from 'react';
import './App.css';
import { VictoryPie } from 'victory';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Endurance</h2>
          <VictoryPie />
        </div>
      </div>
    );
  }
}

export default App;
