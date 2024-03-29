import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import Overview from './Overview';
import About from './About';
import Users from './Users';
import Suggestions from './Suggestions';
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
    <Route path="/" component={Users} />
    <Route path="/:username" component={App}>
      <IndexRoute component={Overview}/>
      <Route path="overview" component={Overview}/>
      <Route path="about" component={About}/>
      <Route path="profile" component={Users}/>
      <Route path="suggestions" component={Suggestions}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>)
  , document.getElementById('root')
);
