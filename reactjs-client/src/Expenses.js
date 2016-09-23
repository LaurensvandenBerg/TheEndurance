import React, { Component } from 'react';
import { getExpenses } from './api/Expenses';

class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category,
      expenses: []
    }
  }
  componentWillMount() {
    getExpenses(this.state.category).then( (result) => {
      this.setState({expenses: result});
    });
  }
  render() {
      return (
        <table className="table">
        <tbody>
          {this.state.expenses.map(expense => 
              <tr key={expense.id} className="row expenses">
                <td className="col-sm-6">{ expense.description }</td>
                <td className="col-sm-6 text-right">{ expense.cost }</td>
              </tr>
          )}
          </tbody>
        </table>
      );
    }
}

export default Expenses;
