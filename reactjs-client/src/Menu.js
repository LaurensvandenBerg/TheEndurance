import React, { Component } from 'react';
import { Link } from 'react-router';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  componentWillMount() {
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
                    <Link className='navbar-brand' to={ '/home' }>Endurance</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <Link to={ '/home' } activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </Link>
                        </li>
                        <li>
                            <Link to={ '/about' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Analysis
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