import React from 'react';

class WeatherDay extends React.Component {

  state = {
    icon: ""
  }

  componentDidMount() {
    this.getWeatherIcon(this.props.daily.icon)
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
    this.setState({icon})
}

  render() {
    return (
      <div className="day">
        <div className="day-name">
          <h3>{this.props.name}</h3>
        </div>
        <div className="weather-icon">
          <i className={this.state.icon}></i>
        </div>
        <div className="daily-temp">
          <p className="high">{Math.round(this.props.daily.temperatureMax)}&#176; F</p>
          <p className="low">{Math.round(this.props.daily.temperatureMin)}&#176; F</p>
        </div>
      </div>
    )
  }

}

export default WeatherDay;
