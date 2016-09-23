import React, { Component } from 'react';
import { VictoryPie, VictoryGroup, VictoryBar } from 'victory';
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
    console.log(this.state.comparisons);
  }
  render() {
      return (
          <div className="container-fluid">
          <div className="col-sm-6 row">
            <div className="row">
              <div className="chart">
                <VictoryPie
                    labelRadius={85}
                    innerRadius={60}
                    style={{
                      labels: {
                        fontSize: 14,
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
              <div className="col-sm-6">
              <h4>Expenses</h4>
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
            </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
              <div className="chart">
                <VictoryGroup
                  height={500}
                  offset={20}
                  colorScale={"qualitative"}
                >
                  <VictoryBar
                    data={[
                      {x: 1, y: 1},
                      {x: 2, y: 2},
                      {x: 3, y: 3}
                    ]}
                  />
                  <VictoryBar
                    data={[
                      {x: 1, y: 1},
                      {x: 2, y: 2},
                      {x: 3, y: 6}
                    ]}
                  />
                  </VictoryGroup>
                </div>
              </div>
            </div>
          </div>
      );
    }
}
export default Transactions;
