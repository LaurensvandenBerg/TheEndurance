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
                <div className="expenses row">
                  <h3 >September, 2016</h3>
                  <br />
                  <h4>Expense break-up</h4>
                  <Accordion>
                    {this.state.expenses.map((expense, i) =>
                      <AccordionItem title={
                        <div className="row accordionTitle">
                          <div className="col-sm-9 pull-left text-left">
                            {expense.category}
                          </div>
                          <div className="col-sm-2 pull-right text-right">
                            {expense.expense}
                          </div>
                        </div>} slug={expense.category} key={expense.category} expandedClassName="expanded-accordion-title" bodyClassName="accordion-body">
                        <Expenses category={expense.category} username={this.state.username} month={this.state.month} year={this.state.year} />
                      </AccordionItem>
                      )}
                  </Accordion>
                </div>
                <div className="comparison row">
                  <h4>Comparison since last month</h4>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Category</th>
                        <th>Comparison</th>
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
              <div className="chart col-sm-5">
                <VictoryPie
                    labelRadius={90}
                    innerRadius={0}
                    standlone={false}
                    style={{
                      labels: {
                        fontFamily: "Futura",
                        fontSize: 14,
                        fill: "white"
                      }
                    }}
                    data={this.state.expenses}
                    x={"category"}
                    y={"expense"}
                    colorScale={[
                      "#D4E157",
                      "#9CCC65",
                      "#26C6DA",
                      "#29B6F6",
                      "#AB47BC",
                      "#Ec407A",
                      "#0c5f11"
                    ]}
                />
              </div>
            </div>
          </div>
      );
    }
}
export default Transactions;
