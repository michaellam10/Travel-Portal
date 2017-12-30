import React from 'react';
import moment from 'moment';
import tz from 'moment-timezone';

class WeatherHourly extends React.Component {

  state = {
    hour: "",
    icon: "",
  }

  componentDidMount() {
    this.getHour();
    this.getWeatherIcon(this.props.icon);
  }

  getHour = () => {
    var time = moment.tz(this.props.timezone);
    var clone = time.clone().add(this.props.offset,'hour');
    var temp = clone.startOf('hour').format('LT');
    var hour = temp.replace(':00','');
    this.setState({hour});
  }

  getWeatherIcon = (iconDescription) => {

    var icon = null;

    switch(iconDescription){
        case "clear-day":
            icon = "wi wi-day-sunny";
            break;
        case "clear-night":
            icon = "wi wi-night-clear";
            break;
        case "rain":
            icon = "wi wi-showers";
            break;
        case "snow":
            icon = "wi wi-snow";
            break;
        case "sleet":
            icon = "wi wi-sleet";
            break;
        case "wind":
            icon = "wi wi-strong-wind";
            break;
        case "fog":
            icon = "wi wi-fog";
            break;
        case "cloudy":
            icon = "wi wi-cloudy";
            break;
        case "partly-cloudy-day":
            icon = "wi wi-day-cloudy";
            break;
        case "partly-cloudy-night":
            icon = "wi wi-night-cloudy";
            break;
        default:
            icon = null;
    }

    this.setState({icon});
    return icon;
  }

  render() {
    return (
      <div className="hour">
        <div className="time">
          <p>{this.state.hour}</p>
        </div>
        <div className="hour-icon">
          <i className={this.state.icon} />
        </div>
        <div className="temperature">
          <p>{Math.round(this.props.temperature)}&#176;</p>
        </div>
        <div className="precipitation">
          <i className="wi wi-raindrops" />
          <p>&nbsp;&nbsp;{(Math.round(this.props.precipitation*10)*10)}%</p>
        </div>
      </div>
    )
  }
}

export default WeatherHourly;
