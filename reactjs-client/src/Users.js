import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { getUsers } from './api/Users'

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }
  }
  componentWillMount() {
    getUsers().then( (result) => {
      this.setState({users: result});
    });
  }
    userClick(username) {
      browserHistory.push('/overview/' + username)
  }
  render() {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user =>
            <tr key={ user.username} onClick={this.userClick.bind(this, user.username)}>
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
