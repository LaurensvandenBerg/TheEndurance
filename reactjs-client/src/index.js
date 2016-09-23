import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import Home from './Home';
import About from './About';
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
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>)
  , document.getElementById('root')
);
