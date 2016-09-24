import React, { Component } from 'react';
import { getSuggestionsFor } from './api/Suggestions';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username : this.props.params.username,
      suggestions: {},
      categorySuggestions: []
    }
  }

  componentWillMount() {
    getSuggestionsFor(this.state.username).then( (result) => {
      this.setState({suggestions: result});
      this.setState({categorySuggestions: result.categorySuggestions});
      console.dir(result.categorySuggestions);
    });
  }

  render () {
      return (
        <div className="container-fluid page">
          <div className="row header">
            <p>{ this.state.suggestions.firstname } { this.state.suggestions.lastname }</p>
          </div>
          <div className="row">
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Category</th>
                        <th>Expense</th>
                        <th>Suggestion </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.categorySuggestions.map(suggestion =>
                        <tr className={ suggestion.status === 0 ? '' : suggestion.status === 1 ? 'bg-warning' : 'bg-danger' }  key={ suggestion.category}>
                            <td className={ suggestion.status === 0 ? '' : suggestion.status === 1 ? 'glyphicon glyphicon-warning-sign' : 'glyphicon glyphicon-exclamation-sign' }></td>
                            <td>{ suggestion.category }</td>
                            <td>{ suggestion.expense }</td>
                            <td>{ suggestion.suggestion }</td>
                        </tr>
                    ) }
                </tbody>
            </table>
          </div>
        </div>
      );
    }
}

export default Suggestions;
