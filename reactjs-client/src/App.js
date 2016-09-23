import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';

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
      <div className="App container-fluid">
        <div className="row">
          <div className="side col-md-2">
            <Menu />
          </div>
          <div className="content col-md-10">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
