import React, { Component } from 'react';
import { getSuggestionsFor } from './api/Suggestions';

class Suggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username : this.props.params.username,
      suggestions: {},
      categorySuggestions: [],
      advertisments: []
    }
  }

  componentWillMount() {
    getSuggestionsFor(this.state.username).then( (result) => {
      this.setState({suggestions: result});
      this.setState({categorySuggestions: result.categorySuggestions});
      this.setState({advertisments: result.advertisments});
      console.dir(result);
    });
  }

  render () {
      return (
        <div className="container-fluid page">
            <div className="well well-sm row header">
                <div className="col-xs-9">
                    <h2>{ this.state.suggestions.firstname } { this.state.suggestions.lastname }</h2> 
                </div>
            </div>
            <div className='clearfix'></div>
          
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

            <ul>
                {this.state.advertisments.map(function(advertisment) {
                    return (<div key={ advertisment.companyName } className="container-fluid page" >
                    <a href={ advertisment.url }>
                        <div className="well well-sm row">
                            <div className="col-xs-9">
                                <h3>{ advertisment.companyName }</h3>
                            </div> 
                            <div className="col-xs-3">
                                <i className="glyphicon glyphicon-earphone"></i> { advertisment.contact }
                            </div>
                            <div className="col-xs-3">
                                <i className="glyphicon glyphicon-map-marker"></i> { advertisment.location }
                            </div> 
                        </div>
                    </a>
                    </div>);
                })}
            </ul>
            

          </div>
        </div>
      );
    }
}

export default Suggestions;
