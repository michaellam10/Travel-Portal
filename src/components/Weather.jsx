import React from 'react';
import $ from 'jquery';
import WeatherToday from './WeatherToday';
import WeatherRestofWeek from './WeatherRestofWeek';

class Weather extends React.Component {

    state = {
      weatherData: []
    }

    componentDidMount = () => {
      this.fetchCoordinates(this.props.location);
    }

    fetchCoordinates = (location) => {

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyARTr-Vc9311XXIL2eZ5qq2OGZ7d72uZGE`)
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        console.log(data);
        var coordinates = data.results[0].geometry.location;
        //console.log(coordinates);
        this.fetchWeatherData(coordinates);
      })
    }

    fetchWeatherData = (coordinates) => {

      $.ajax({
          url: `https://api.darksky.net/forecast/c669d304655adea052bb7351ba477af0/${coordinates.lat},${coordinates.lng}`,
          jsonp: "callback",
          dataType: "jsonp",
          success: (weatherData) => {
              console.log(weatherData);
              this.setState({weatherData});
              this.props.fetchTime(weatherData.currently.time, weatherData.timezone);
          }
        });
    }

    render() {

      return (
        <div id="weather">
        <div className="weather">

          {this.state.weatherData.length <= 0 ? <h1>Loading...</h1> : <div><WeatherToday time={this.state.weatherData.currently.time} data={this.state.weatherData}/> <WeatherRestofWeek time={this.state.weatherData.currently.time} data={this.state.weatherData.daily.data}/></div>}

        </div>
        </div>
      )
    }

}

export default Weather;
