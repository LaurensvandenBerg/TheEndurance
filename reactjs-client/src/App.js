import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  componentWillMount() {
  }
  render() {
    return (
      <div className="App">
        <ul className="header">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="content">
          {this.props.children}
        </div>

      </div>
    );
  }
}

export default App;
