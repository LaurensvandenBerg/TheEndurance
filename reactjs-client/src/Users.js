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
      console.log(result);
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
          {this.state.users.map(transaction =>
            <tr key={ transaction.category}>
              <td>{ transaction.category }</td>
              <td>{ transaction.expense }</td>
            </tr>
          ) }
        </tbody>
      </table>
    );
  }
}
export default Users;
