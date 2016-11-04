import React, { Component } from 'react';
import { getSuggestionsFor } from './api/Suggestions';
import LocalizedStrings from 'react-localization';

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
    });
  }

  render () {
      var strings = new LocalizedStrings({
          en: {
              title: "Comparison with users nearby you with similar circumstances",
              category: "Category",
              expense: "Expense",
              suggestion: "Suggestion",
              advertisementTitle: "Companies that help you improve your spending"
          },
          nl: {
              title: "Vergelijking met gebruikers in uw omgeving met vergelijkbare omstandigheden",
              category: "Categorie",
              expense: "Uitgave",
              suggestion: "Suggestie",
              advertisementTitle: "Bedrijven die u kunnen helpen uw uitgaven te verminderen"
          }
      })
      return (
        <div className="container-fluid page">
            <div className="well well-sm row header">
                <div className="col-xs-9">
                    <h2>{ this.state.suggestions.firstname } { this.state.suggestions.lastname }</h2> 
                </div>
            </div>
            <div className='clearfix'></div>
          
          <div className="row">
              <div className="col-md-8">
                  <h4>{strings.title}</h4>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>{strings.category}</th>
                        <th>{strings.expense}</th>
                        <th>{strings.suggestion}</th>
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

            <div className="row">
              <div className="col-md-8">
                  <h4>{strings.advertisementTitle}</h4>
            </div>
            </div>

            <ul>
                {this.state.advertisments.map(function(advertisment) {
                    return (
                    <div key={ advertisment.companyName } className="container-fluid advertisement col-md-3" >
                        <a href={ advertisment.url }>
                            <div className="well well-sm">
                                <div className="">
                                    <h3>{ advertisment.companyName }</h3>
                                </div> 
                                <div className="">
                                    <i className="glyphicon glyphicon-earphone"></i> { advertisment.contact }
                                </div>
                                <div className="">
                                    <i className="glyphicon glyphicon-map-marker"></i> { advertisment.location }
                                </div> 
                            </div>
                        </a>
                    </div>
                    );
                })}
            </ul>
            

          </div>
        </div>
      );
    }
}

export default Suggestions;
