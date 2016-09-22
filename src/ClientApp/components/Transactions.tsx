import * as React from 'react';
import { Link } from 'react-router';
import { provide } from 'redux-typed';
import { ApplicationState }  from '../store';
import * as TransactionsState from '../store/Transactions';
import Pie from './Pie';

interface RouteParams {
}

class Transactions extends React.Component<TransactionsProps, void> {
	componentWillMount() {
		// This method runs when the component is first added to the page 
		this.props.requestTransactions();
	}

	componentWillReceiveProps(nextProps: TransactionsProps) {
		// This method runs when incoming props (e.g., route params) change
		this.props.requestTransactions();
	}

	public render() {
		return <div>
			<h1>Transactions</h1>
				{ this.renderTransactionsTable() }
		</div>;
	}

	private renderTransactionsTable() {
		return <table className='table'>
			<thead>
				<tr>
					<th>Category</th>
					<th>Expense </th>
				</tr>
			</thead>
			<tbody>
				{this.props.transactions.map(transaction =>
					<tr key={ transaction.category}>
						<td>{ transaction.category }</td>
						<td>{ transaction.expense }</td>
					</tr>
				) }
			</tbody>
		</table>;
	}

	private renderTransactionsChart() {
		return <Pie
				//data={ this.state.data }
				radius={ 150 }
				hole={ 50 }
				//colors={ colors }
				labels={ true }
				percent={ true }
				strokeWidth={ 3 }
				stroke={ '#fff' }
			/>;
	}
}

// Build the TransactionsProps type, which allows the component to be strongly typed
const provider = provide(
	(state: ApplicationState) => state.transactions, // Select which part of global state maps to this component
	TransactionsState.actionCreators                 // Select which action creators should be exposed to this component
).withExternalProps<{ params: RouteParams }>();          // Also include a 'params' property on WeatherForecastProps
type TransactionsProps = typeof provider.allProps;
export default provider.connect(Transactions);
