import React from 'react';
// import tz from 'moment-timezone';
import moment from 'moment';

class Welcome extends React.Component {

  state = {

  }
  componentDidMount() {
    this.fetchGif();
  }

  componentDidUpdate(prevProps) {
    if(this.props.location !== prevProps.location){
      this.fetchGif();
    }
  }

  fetchGif = () => {
    fetch("http://api.giphy.com/v1/gifs/random?tag=excited&api_key=f3a40b7cf2f249f5a362d3af42d5ea8f")
    .then((res) => res.json())
    .then((gif) => {
      var gif_url = gif.data.image_url
      this.setState({gif_url}, () => {
        console.log(this.state.gif_url)
      })
    })

}

  render() {

    var time = moment.tz(this.props.timezone).format("LT");
    var date = moment.tz(this.props.timezone).format("LL");
    var numTime = time.substring(0, time.indexOf(" "));
    var tod = time.substring(time.indexOf(" ")+1,time.indexOf("M")+1);

    return (
      <div id="welcome">
        <div className="welcome-header">
          <h1>Welcome to {this.props.location}!</h1>
          <div className="welcome-time">
            <div>
              <h1>{numTime}</h1>
            </div>
            <div id="tod">
              <p>{tod}</p>
            </div>
          </div>
          <div className="welcome-date">
            <h2>{date}</h2>
          </div>
          {!this.state.gif_url ? <h1>Loading</h1> :
              <div className="welcome-gif" style={{
                  backgroundImage : 'url(' + this.state.gif_url + ')',
                  'backgroundSize': 'cover',
                  'backgroundPosition': 'center',
                }}>

              </div>}
        </div>
      </div>

    )
  }

}

export default Welcome;
