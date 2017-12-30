import React from 'react';
import {browserHistory} from 'react-router';
// import {browserHistory} from 'react-router';

class StickySearch extends React.Component {

  _handleKeyPress = (e) => {
    if(e.charCode === 13)  {
        var inputDestination = this.refs.userLocation.value;
        console.log(location)
        this.fetchData(inputDestination);
    }
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
    return (
      <div id="search">
        <input onKeyPress={this._handleKeyPress} ref="userLocation" className="search-input" type="text" placeholder={this.props.location} /><i className="fa fa-search fa-2x" aria-hidden="true"></i>
      </div>
    )
  }
}

export default StickySearch;
