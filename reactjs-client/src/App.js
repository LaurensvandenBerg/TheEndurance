import React, { Component } from 'react';
import './App.css';
import { VictoryPie } from 'victory';
import { getTransactions } from './api/Transactions'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      transactions: []
    }
  }
  componentWillMount() {
    getTransactions().then( (result) => {
      this.setState({transactions: result});
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Endurance</h2>
          <VictoryPie
            data={this.state.transactions}
            x={"category"}
            y={"expense"}
           />
          
        </div>
      </div>
    );
  }
}

export default App;
