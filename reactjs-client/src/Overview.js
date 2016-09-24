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
          <div className="well well-lg row header">
            <div className="col-xs-9">
              <img src="http://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=32&d=identicon&r=PG" className="img-polaroid"/>         
            </div>
            <div className="col-xs-9">
              <h2>{ this.state.userInfo.firstname } { this.state.userInfo.lastname }</h2> 
              <ul>
                <li><i className="glyphicon glyphicon-envelope"></i> { this.state.userInfo.firstname }.{ this.state.userInfo.lastname }@me.com</li>
                <li><i className="glyphicon glyphicon-map-marker"></i> Delft, The Netherlands</li>
              </ul>
            </div>
          
            <button className="btn btn-primary" onClick={this.userClick.bind(this, this.state.username)}>Suggestions</button>
            <div className='clearfix'></div>
          </div>
          <div className="row">
            <Transactions username={this.state.username} month={this.state.month} year={this.state.year}/>
          </div>
        </div>
      );
    }
}

export default Overview;
