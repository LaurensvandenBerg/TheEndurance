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
        </div>
        <div className="App-Body">
          <table className='table'>
            <thead>
              <tr>
                <th>Category</th>
                <th>Expense </th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map(transaction =>
                <tr key={ transaction.category}>
                  <td>{ transaction.category }</td>
                  <td>{ transaction.expense }</td>
                </tr>
              ) }
            </tbody>
          </table>
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
