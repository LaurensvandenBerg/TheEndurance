import React, { Component } from 'react';
import './App.css';
import Menu from './Menu';
import './languages/languages.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: ''
    }
  }
  componentWillMount() {
    if (this.props.params && this.props.params.username) {
      this.setState({ username: this.props.params.username })
    }
  }
  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="side col-md-2">
            <Menu username={this.state.username} />
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
