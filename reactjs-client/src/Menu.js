import React, { Component } from 'react';
import { Link } from 'react-router';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: ''
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
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>
                        <div className="app-name">Endurance</div>
                        <div className="app-slogan">Beheers uw uitgaven, beheers uw bedrijf.</div>
                    </Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <Link to={ '/' + this.state.username + '/overview' } activeClassName='active'>
                                <span className='glyphicon glyphicon-transfer'></span> Uitgaven
                            </Link>
                            <Link to={ '/' + this.state.username + '/suggestions' } activeClassName='active'>
                                <span className='glyphicon glyphicon-eur'></span> Suggesties
                            </Link>
                        </li>
                        <li>
                            <Link to={ '/' + this.state.username + '/about' } activeClassName='active'>
                                <span className='glyphicon glyphicon-info-sign'></span> Over Endurance
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
