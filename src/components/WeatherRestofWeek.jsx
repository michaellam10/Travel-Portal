import React from 'react';
import WeatherDay from './WeatherDay';

class WeatherRestofWeek extends React.Component {

    state = {
      dayNames: []
    }

    componentDidMount() {
      this.getTime(this.props.time)
    }

    // Gets numbered day of the week, from 0 to 6
    getTime = (unixTimestamp) => {
      var currentTime = new Date(unixTimestamp*1000);
      var numWeekday = currentTime.getDay(); // Numeric day in the week [0, 1, 2, ... , 6]
      //var formattedTime = [numWeekday];
      this.getWeekDayNames(numWeekday);
    }

    // Gets named days of the week
    getWeekDayNames = (today) => {

      //var otherdaysNames = otherDays(formattedTime[1]); // Array of updated day names beginning with today

      //var day1 = currentDayName(today);

      var buffer1 = null;
      var day2 = this.getNextDayName(today+1);
      var day3 = this.getNextDayName(day2[1]);
      var day4 = this.getNextDayName(day3[1]);
      var day5 = this.getNextDayName(day4[1]);
      var day6 = this.getNextDayName(day5[1]);
      var day7 = this.getNextDayName(day6[1]);
      var buffer2 = null;
      var dayNames = [buffer1, day2[0], day3[0], day4[0], day5[0], day6[0], day7[0], buffer2];
      this.setState({dayNames})
  }

  getNextDayName = (index) => {

        var name = "Day";

        if(index>6) {
            name="Sun";
            index=0;
        }
        else if(index===1) {
            name = "Mon";
        }
        else if(index === 2) {
            name = "Tue";
        }
        else if(index === 3) {
            name = "Wed";
        }
        else if(index === 4) {
            name = "Thu";
        }
        else if(index === 5) {
            name = "Fri";
        }
        else if(index === 6) {
            name = "Sat";
        }
        index++;
        var day = [name, index];
        return day;
    }

  render() {

    return (
      <div className="rest-of-week">

        {this.props.data.map((day, index) => {
            if(index < 1 || index > 6){
              return null;
            }
            else {
              return <WeatherDay key={index} name={this.state.dayNames[index]} daily={this.props.data[index]}/>
            }
          })}
      </div>
    )
  }

}

export default WeatherRestofWeek;
