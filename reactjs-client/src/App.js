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
          <div className="row">
            <div className="col-md-3 chart">
              <VictoryPie className="col-md-3"
                labelRadius={85}
                innerRadius={60}
                style={{
                  labels: {
                    fontSize: 14,
                    fill: "white"
                  },
                  data: {
                    stroke: "gray",
                    strokeDasharray: "0",
                    strokeWidth: 1
                  }
                }}
                data={this.state.transactions}
                x={"category"}
                y={"expense"}
                colorScale={[
                  "#38206b",
                  "#603275",
                  "#3d72d0",
                  "#d8973b",
                  "#3a5b96",
                  "#8732ad",
                  "#0c5f11"
                ]}
              />
            </div>
          </div>     
        </div>
      </div>
    );
  }
}

export default App;
