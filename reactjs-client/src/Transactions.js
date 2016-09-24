import React, { Component } from 'react';
import { VictoryPie } from 'victory';
import { getUserExpenses } from './api/UserExpenses';
import { getMonthComparisons } from './api/MonthComparisons'
import { Accordion, AccordionItem } from 'react-sanfona';
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
  render() {
      return (

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-7">
                <h3 className="text-center">September, 2016</h3>
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
                      },
                      data: {
                        stroke: "gray",
                        strokeDasharray: "0",
                        strokeWidth: 1
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
              <h3>Change over last month</h3>
              <table className='table'>
                  <thead>
                      <tr>
                        <th></th>
                          <th>Category</th>
                          <th>Previous month</th>
                          <th>This month</th>
                          <th>Change</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.state.comparisons.map(comparison =>
                          <tr className={ comparison.isWinning === false ? 'bg-danger' : '' }  key={ comparison.category}>
                              <td className={ comparison.isWinning === true ? '' : 'glyphicon glyphicon-exclamation-sign' }></td>
                              <td>{ comparison.category }</td>
                              <td>{ comparison.previousMonthCost }</td>
                              <td>{ comparison.specifiedMonthCost }</td>
                              <td>{comparison.variance}</td>
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
