import React, { Component } from 'react';

import { VictoryPie } from 'victory';
import { getTransactions } from './api/Transactions'
import { Accordion, AccordionItem} from 'react-sanfona'
import { getExpenses } from './api/Expenses'


class Transactions extends Component {
  constructor(props) {
    super(props);

    this.expenses = {
      
    }
    this.state = {
      transactions: []
    }
  }
  componentWillMount() {
    getTransactions().then( (result) => {
      this.setState({transactions: result});
    });
  }
  render() {
    <Accordion>
                {[1, 2, 3, 4, 5].map((item) => {
                    return (
                        <AccordionItem title={'Item ${ item }'} slug={item} key={item}>
                            <div>
                                {`Item ${ item } content`}
                                {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>
      return (
          <div>
            <table className='table'>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Expense </th>
                </tr>
              </thead>
              <tbody>
                {this.state.transactions.map(transaction =>
                  <tr key={ transaction.category}>
                    <td>
                      <Accordion>
                        {[1].map( item => {
                          return (
                            <AccordionItem title={`${ transaction.category } Expense` } slug={item} key={item}>
                              <div>
                                {`Expense ${ transaction.category } content`}
                              </div>
                            </AccordionItem>
                          )
                        })}
                      </Accordion>
                    </td>
                    <td>{ transaction.expense }</td>
                  </tr>
                ) }
              </tbody>
            </table>
          <div className="row">
            <div className="col-md-3 chart">
              <VictoryPie className="col-md-3"
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
        </div>
      );
    }
}

export default Transactions;
