import React, { Component } from 'react';
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
    });
  }

  render () {
      return (
        <div className="container-fluid page">
          <div className="well well-sm row">
            <div className="col-md-6">
              <h3>{ this.state.userInfo.firstname } { this.state.userInfo.lastname }</h3>
              <br /> 
              <i className="glyphicon glyphicon-envelope"></i> { this.state.userInfo.username }@me.com
              <br />
              <i className="glyphicon glyphicon-map-marker"></i> Delft, The Netherlands
            </div>
          </div>
          <div className="row">
            <Transactions username={this.state.username} month={this.state.month} year={this.state.year}/>
          </div>
        </div>
      );
    }
}

export default Overview;
