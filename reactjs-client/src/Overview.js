import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Transactions from './Transactions';
import { getSpecificUser } from './api/User';

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username : this.props.params.username,
      month : this.props.location.query.month,
      year : this.props.location.query.year,
      userInfo: {}
    }
  }
  componentWillMount() {
    getSpecificUser(this.state.username).then( (result) => {
      this.setState({userInfo: result});
      console.log(result);
    });
  }
  
  userClick(username, month, year) {
      browserHistory.push('/suggestions/' + username);
  }

  render () {
      return (
        <div className="container-fluid page">
          <div className="row header">
            <p>{ this.state.userInfo.firstname } { this.state.userInfo.lastname }</p>
            <button className="btn btn-primary" onClick={this.userClick.bind(this, this.state.username)}>Suggestions</button>
          </div>
          <div className="row">
            <Transactions username={this.state.username} month={this.state.month} year={this.state.year}/>
          </div>
        </div>
      );
    }
}

export default Overview;
