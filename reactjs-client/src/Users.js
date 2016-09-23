import React, { Component } from 'react';

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
            <tr key={ user.firstname}>
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
