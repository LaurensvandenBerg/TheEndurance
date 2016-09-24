import React, { Component } from 'react';

class About extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    }
  }
  componentWillMount() {
  }
  render() {
    return (
        <div className="container-fluid page">
          <div className="row header">
            <h2>Welcome to Endurance</h2>
            <p>Welcome to 'The Endurance', it is a spacecraft meant for interstellar travel. This spacecraft is steered by each occupant, they are all pilots. Help by steering it with the correct velocity and in the right direction.</p>
          </div>
          <div className="row">
            <ul>
              <li>Laurens Oomens</li>
              <li>Gijs Kuijer</li>
              <li>Vikas Pandey</li>
              <li>Bhupendra Joshi</li>
            </ul>
          </div>
        </div>
    );
  }
}

export default About;