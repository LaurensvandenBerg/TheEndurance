import { fetch, addTask } from 'domain-task';
import { typeName, isActionType, Action, Reducer } from 'redux-typed';
import { ActionCreator } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TransactionsState {
    isLoading: boolean;
    transactions: Transactions[];
}

export interface Transactions {
    category: string;
    expense: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

@typeName("REQUEST_TRANSACTIONS")
class RequestTransactions extends Action {
    constructor() {
        super();
    }
}

@typeName("RECEIVE_TRANSACTIONS")
class ReceiveTransactions extends Action {
    constructor(public transactions: Transactions[]) {
        super();
    }
}

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTransactions: (): ActionCreator => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        let fetchTask = fetch(`/api/Transactions/`)
            .then(response => response.json())
            .then((data: Transactions[]) => {
                dispatch(new ReceiveTransactions(data));
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch(new RequestTransactions());
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
const unloadedState: TransactionsState = { transactions: [], isLoading: false };
export const reducer: Reducer<TransactionsState> = (state, action) => {
    if (isActionType(action, RequestTransactions)) {
        return { isLoading: true, transactions: state.transactions };
    } else if (isActionType(action, ReceiveTransactions)) {
        // Only accept the incoming data if it matches the most recent request. This ensures we correctly
        // handle out-of-order responses.
        return { transactions: action.transactions, isLoading: false };
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    // (or default initial state if none was supplied)
    return state || unloadedState;
};
