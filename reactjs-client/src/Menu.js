import React, { Component } from 'react';
import { Link } from 'react-router';
import './Menu.css';
import LocalizedStrings from 'react-localization';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        languages: new LocalizedStrings({
          en: {
              toggle: "Toggle navigation",
              name: "Endurance",
              slogan: "Control your expenses, control your company.",
              expenses: "Expenses",
              suggestions: "Suggestions",
              about: "About Endurance"
          },
          nl: {
              toggle: "Menu uitklappen",
              name: "Endurance",
              slogan: "Beheers uw uitgaven, beheers uw bedrijf.",
              expenses: "Uitgaven",
              suggestions: "Suggesties",
              about: "Over Endurance"
          }
      })
    }
  }
  
  componentWillMount() {
      if (this.props && this.props.username) {
          this.setState({ username: this.props.username });
      }
  }
  
  render () {            
      return (
        <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>{this.state.languages.toggle}</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>
                        <div className="app-name">{this.state.languages.name}</div>
                        <div className="app-slogan">{this.state.languages.slogan}</div>
                    </Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <Link to={ '/' + this.state.username + '/overview' } activeClassName='active'>
                                <span className='glyphicon glyphicon-transfer'></span> {this.state.languages.expenses}
                            </Link>
                        </li>
                        <li>
                            <Link to={ '/' + this.state.username + '/suggestions' } activeClassName='active'>
                                <span className='glyphicon glyphicon-eur'></span> {this.state.languages.suggestions}
                            </Link>
                        </li>
                        <li>
                            <Link to={ '/' + this.state.username + '/about' } activeClassName='active'>
                                <span className='glyphicon glyphicon-info-sign'></span> {this.state.languages.about}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      );
    }
}

export default Menu;
