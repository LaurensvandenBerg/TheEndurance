import React, { Component } from 'react';
import { getExpenses } from './api/Expenses';

class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category,
      username : props.username,
      month : props.month,
      year : props.year,
      expenses: []
    }
  }
  componentWillMount() {
    getExpenses(this.state.username, this.state.category, this.state.month, this.state.year).then( (result) => {
      this.setState({expenses: result});
    });
  }
  render() {
      return (
        <table className="table">
        <tbody>
          {this.state.expenses.map(expense =>
              <tr key={expense.id} className="row expenses">
                <td className="col-sm-6 expense-description">{ expense.description }</td>
                <td className="col-sm-6 text-right expense-cost">{ expense.cost }</td>
              </tr>
          )}
          </tbody>
        </table>
      );
    }
}

export default Expenses;
