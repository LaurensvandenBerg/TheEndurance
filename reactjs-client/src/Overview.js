import React, { Component } from 'react';
import Transactions from './Transactions'

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  componentWillMount() {
  }
  render () {
      return (
        <div className="container-fluid page">
          <div className="row header">
            <h2>Welcome to Endurance</h2>
            <p>Welcome to 'The Endurance', it is a space craft meant for interstellar travel. This space craft is steered by each passenger, they are all pilots. Help steer it with correct velocity and in right direction.</p>
          </div>
          <div className="row">
            <Transactions />
          </div>
        </div>
      );
    }
}

export default Overview;
