import React from 'react';
import SearchLanding from './SearchLanding';

class Landing extends React.Component {

  render() {

    //var path = require('../../media/MountainTimelapse.mp4');

    return (
      <div className="landing-background-vid">
        <video width="1920px" height="1080px" autoPlay loop>
          <source src="https://s3.amazonaws.com/travel-portal-video/MountainTimelapse.mp4" type="video/mp4" />
        </video>
        <div className="shade">
          <h1>Where are you wanderlusting?</h1>
          <SearchLanding />
          </div>
      </div>
    )
  }
}

export default Landing;
