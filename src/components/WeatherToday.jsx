import React from 'react';
import WeatherHourly from './WeatherHourly';

class WeatherToday extends React.Component {

  state = {
    dayName: "",
    icon: ""
  }

  componentDidMount() {
    this.getTime(this.props.time)
    this.getWeatherIcon(this.props.data.currently.icon)
  }

  getTime = (unixTimestamp) => {
    var currentTime = new Date(unixTimestamp*1000);
    var currentDayNumber = currentTime.getDay(); // Numeric day in the week [0, 1, 2, ... , 6]
    this.currentDayName(currentDayNumber);
  }

  currentDayName = (day) => {
    var today = ""
    switch(day){
        case 0:
            today = "Sunday";
            break;
        case 1:
            today = "Monday";
            break;
        case 2:
            today = "Tuesday";
            break;
        case 3:
            today = "Wednesday";
            break;
        case 4:
            today = "Thursday";
            break;
        case 5:
            today = "Friday";
            break;
        case 6:
            today = "Saturday";
            break;
        default:
            today = "Day";

    }
    this.setState({
      dayName: today
    })

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
      <div className="today">
          <div className="summary">
            <div className="today-header">
                <h2>{this.state.dayName}</h2>
                <h3>Currently</h3>
            </div>
            <div className="today-info">
              <div className="left">
                  <div className="temperature">
                      <div className="high">
                        <h3>High: {Math.round(this.props.data.daily.data[0].temperatureMax)}&#176; F</h3>
                      </div>
                      <div className="low">
                        <h3>Low: {Math.round(this.props.data.daily.data[0].temperatureMin)}&#176; F</h3>
                      </div>
                      <div className="felt">
                        <h3>Feels like: {Math.round(this.props.data.currently.apparentTemperature)}&#176; F</h3>
                      </div>
                 </div>
                 <div className="currentDescription">
                   <h3>{this.props.data.currently.summary}</h3>
                 </div>
            </div>
            <div className="right">
              <div className="actual">
                <h1>{Math.round(this.props.data.currently.temperature)}&#176;</h1>
              </div>
              <div className="currentIcon">
                {this.state.icon === "" ? <h3>Loading...</h3> : <i className={this.state.icon}></i>}
              </div>

            </div>
        </div>
      </div>

        <div className="hourly">

          {this.props.data.hourly.data.map((hour, index)=>{
            if(index < 24){
              return <WeatherHourly key={index} offset={index} timezone={this.props.data.timezone} time={hour.time} icon={hour.icon} temperature={hour.temperature} precipitation={hour.precipProbability}/>
            }
            else {
              return null;
            }
          })}
        </div>

      </div>
    )
  }

}

export default WeatherToday;
