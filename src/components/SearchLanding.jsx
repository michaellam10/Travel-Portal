import React from 'react';
import {browserHistory} from 'react-router';

//import { browserHistory as history } from 'react-router';

/*
This component displays a form where the user can enter a GitHub username
When they submit the form either by pressing ENTER or clicking the button,
we will use react-router's history.push function to push a new URL to the history.

This will have as an effect to navigate to a new URL, which will display the User component
Why are we doing this instead of using a <Link>? The answer is straightforward, but make sure you understand!!!
*/


class SearchLanding extends React.Component {
    constructor() {
        super();
        this.state = {}

        // Why do we need to do this?? Make sure you understand!!!
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        var inputDestination = this.refs.userInput.value;
        this.fetchData(inputDestination);
    }

    fetchData = (inputDestination) => {

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputDestination}&key=AIzaSyARTr-Vc9311XXIL2eZ5qq2OGZ7d72uZGE`)
        .then((res)=>{
          return res.json();
        })
        .then((location) => {
          const locationPassName = location.results[0].address_components[0].short_name
          const locationDisplayName = location.results[0].formatted_address
          this.setState({locationPassName,locationDisplayName})
          browserHistory.push({
            pathname: `/search`,
            query: {
              q: JSON.stringify({
                locationPassName,
                locationDisplayName,
              })
            }
          })
        });
    }


    render() {
      //console.log(this.state.locationPassName);
      //console.log(this.state.locationDisplayName);
        return (
            <div className="search-landing">
                <form onSubmit={this._handleSubmit}>
                    <input ref="userInput" className="search-page__input" type="text" placeholder="Enter a destination"/>
                    <button className="search-landing__button">Search</button>
                </form>
            </div>
        );
    }
};

export default SearchLanding;
