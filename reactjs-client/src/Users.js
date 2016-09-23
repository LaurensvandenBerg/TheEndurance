import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { getUsers } from './api/Users'
import FontAwesome from 'react-fontawesome';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      month : 9,
      year : 2016
    }
  }
  componentWillMount() {
    getUsers().then( (result) => {
      this.setState({users: result});
    });
  }
    userClick(username, month, year) {
      browserHistory.push('/overview/' + username + '?month='+ month + '&year='+ year)
  }
  render() {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user =>
            <tr key={ user.username} onClick={this.userClick.bind(this, user.username, this.state.month, this.state.year )}>
              <td>{ user.firstname }</td>
              <td>{ user.lastname }</td>
            </tr>
          ) }
        </tbody>
      </table>
    );
  }
}
export default Users;
