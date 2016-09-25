import React, { Component } from 'react';
import { VictoryPie } from 'victory';
import { getUserExpenses } from './api/UserExpenses';
import { getMonthComparisons } from './api/MonthComparisons'
import { Accordion, AccordionItem } from 'react-sanfona';
import { browserHistory } from 'react-router';
import Expenses from './Expenses';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses : [],
      comparisons : [],
      username : props.username,
      month : props.month,
      year : props.year
    }
  }

  componentWillMount() {
    getUserExpenses(this.state.username, this.state.month, this.state.year).then( (result) => {
      this.setState({expenses: result});
    });
    getMonthComparisons(this.state.username, this.state.month, this.state.year).then( (result) => {
      this.setState({comparisons : result});
    });
  }
  
  userClick(username, month, year) {
      browserHistory.push('/suggestions/' + username);
  }

  render() {
      return (

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-7">
                <h3 >September, 2016</h3>
                <br />
                <br />
                <br />
                <Accordion>
                  {this.state.expenses.map(expense =>
                    <AccordionItem title={
                      <div className="row accordionTitle">
                        <div className="col-sm-9 pull-left text-left">
                          {expense.category}
                        </div>
                        <div className="col-sm-2 pull-right text-right">
                          {expense.expense}
                        </div>
                      </div>} slug={expense.category} key={expense.category}>
                      <Expenses category={expense.category} username={this.state.username} month={this.state.month} year={this.state.year} />
                    </AccordionItem>
                    )}
                </Accordion>
              </div>
              <div className="chart col-sm-5">
                <VictoryPie
                    labelRadius={95}
                    innerRadius={40}
                    standlone={false}
                    style={{
                      labels: {
                        fontSize: 12,
                        fill: "white"
                      }
                    }}
                    data={this.state.expenses}
                    x={"category"}
                    y={"expense"}
                    colorScale={[
                      "#38206b",
                      "#603275",
                      "#3d72d0",
                      "#d8973b",
                      "#3a5b96",
                      "#8732ad",
                      "#0c5f11"
                    ]}
                />
              </div>
            </div>
            <div className="row">
              <div className="container-fluid">
                <div className="col-md-8">
                  <h3>Since last month</h3>
                </div>
                <div className="col-md-2 pull-right">
              <button className="btn btn-primary" onClick={this.userClick.bind(this, this.state.username)}>Suggestions</button>
                </div>
              </div>
              <table className='table'>
                  <thead>
                      <tr>
                          <th></th>
                          <th>Category</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.state.comparisons.map(comparison =>
                          <tr className={ comparison.variance < 0 ? 'bg-danger' : '' }  key={ comparison.category}>
                              <td className={ comparison.variance < 0 ? 'glyphicon glyphicon-exclamation-sign' : '' }></td>
                              <td>{ comparison.category }</td>
                              { comparison.variance < 0 
                                ? <td>Overspent € { comparison.variance } this month :-( </td> 
                                : comparison.variance === 0
                                  ? <td> Spent same amount this month </td>
                                  : <td> Awesome, you found a way to spend less. You saved € { comparison.variance }. Keep rocking!!! </td> }
                          </tr>
                      ) }
                  </tbody>
              </table>
            </div>
          </div>
      );
    }
}
export default Transactions;
