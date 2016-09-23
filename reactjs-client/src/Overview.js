import React, { Component } from 'react';
import Transactions from './Transactions'

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username : this.props.params.username,
      month : this.props.location.query.month,
      year : this.props.location.query.year
    }
  }
  componentWillMount() {

  }
  render () {
      return (
        <div className="container-fluid page">
          <div className="row">
            <Transactions username={this.state.username} month={this.state.month} year={this.state.year}/>
          </div>
        </div>
      );
    }
}

export default Overview;
