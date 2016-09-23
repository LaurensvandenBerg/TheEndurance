import React, { Component } from 'react';
import { VictoryPie } from 'victory';
import { getTransactions } from './api/Transactions';
import { Accordion, AccordionItem } from 'react-sanfona';
import Expenses from './Expenses';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      expenses: {}
    }
  }
  componentWillMount() {
    getTransactions().then( (result) => {
      this.setState({transactions: result});
    });
  }
  render() {
      return (
          <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3 chart">
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
                    data={this.state.transactions}
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
                    {this.state.transactions.map(transaction =>             
                      <AccordionItem title={<div className="row accordionTitle"><div className="col-sm-9 pull-left text-left">{transaction.category}</div><div className="col-sm-2 pull-right text-right">{transaction.expense}</div></div>} slug={transaction.category} key={transaction.category}>
                        <Expenses category={transaction.category} />
                      </AccordionItem>
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
      );
    }
}

export default Transactions;
