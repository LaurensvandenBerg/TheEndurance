import React, { Component } from 'react';
import Transactions from './Transactions';
import { getSpecificUser } from './api/User';

class Overview extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username : this.props.params.username,
      month : new Date().getMonth(),
      year : new Date().getFullYear(),
      userInfo: {}
    }
  }
  componentWillMount() {
    getSpecificUser(this.state.username).then( (result) => {
      this.setState({userInfo: result});
    });
  }

  render () {
      return (
        <div className="container-fluid page">
          <div className="user-info container-fluid well well-sm pull-right">
            <div className="row">
              <h3>{ this.state.userInfo.firstname } { this.state.userInfo.lastname }</h3>
            </div>
            <div className="row">
              <i className="glyphicon glyphicon-envelope"></i> { this.state.userInfo.username }@endurance.com
            </div>
            <div className="row">
              <i className="glyphicon glyphicon-map-marker"></i> Utrecht, Nederland
            </div>
          </div>
          <div className="row inner-content">
            <Transactions username={this.state.username} month={this.state.month} year={this.state.year}/>
          </div>
        </div>
      );
    }
}

export default Overview;
