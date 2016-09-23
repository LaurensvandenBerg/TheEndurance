import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import Overview from './Overview';
import About from './About';
import Users from './Users';
import './index.css';

var NoMatch = React.createClass({
  render: function() {
      return (
        <div>
          <h2>Wrong spacecraft</h2>
        </div>
      );
    }
});

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Users}/>
      <Route path="overview/:username" component={Overview}/>
      <Route path="about" component={About}/>
      <Route path="profile" component={Users}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>)
  , document.getElementById('root')
);
