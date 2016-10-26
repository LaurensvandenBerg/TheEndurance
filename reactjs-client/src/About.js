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
            <h2>Welkom bij Endurance</h2>
            <p>Welkom bij 'The Endurance'. Endurance is een ruimteschip voor het reizen in de ruimte. Dit ruimteschip wordt bestuurd door elke inzittende, zij zijn allemaal piloten. Help mee door dit ruimteschip te sturen in de juiste richting met de juiste snelheid.</p>
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