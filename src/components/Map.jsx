import React from 'react';
import { withGoogleMap, GoogleMap, Marker, SearchBox } from "react-google-maps";
import SimpleForm from './SimpleForm'

var zoom = null;

class Map extends React.Component {

  state = {

  }

  componentDidMount() {
    this._handleSimpleFormInput(this.props.location);
    this.setState({
      zoomValue:12
    })
    console.log("hello1")
    // console.log(this.state.marker[0].position);
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props.location)
    if(this.props.location !== prevProps.location){
      this._handleSimpleFormInput(this.props.location);
      this.setState({
        zoomValue:12
      })
      console.log("hello2")
    }

    else if(this.state.location !== prevState.location){
      this._handleSimpleFormInput(this.state.location);
      this.setState({
        zoomValue:15
      })
      console.log("NEVERRR")
    }

  }

  _handleSimpleFormInput = (location) => {
    this.setState({location}, () => {
      this.fetchCoordinates(this.state.location)
    })
  }


  fetchCoordinates = (location) => {

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyARTr-Vc9311XXIL2eZ5qq2OGZ7d72uZGE`)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
      var coordinates = data.results[0].geometry.location;
      this.setState({
        coordinates: coordinates,
        marker: [{
          position: {
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
          defaultAnimation: 2,
        }],
      }, () => {
        console.log(this.state.marker);
      })
    })
  }

render(){

  var markerReady = 0;
  if(this.state.coordinates && this.state.marker[0].position && this.state.zoomValue){
    console.log(this.state.zoomValue)
    markerReady = 1;
  }

  if(markerReady === 0){
    return <div>Loading...</div>
  }
  else {
    const MyMap = withGoogleMap(props => (
      <div>
        <GoogleMap

          defaultZoom={this.state.zoomValue}
          defaultCenter={{ lat: this.state.coordinates.lat, lng: this.state.coordinates.lng }}
        >

        {markerReady === 0 ? null :
          props.marker.map(marker => (
            <Marker {...marker} />
          ))
        }

        </GoogleMap>
    </div>
    ));

    return (

      markerReady === 0 ? <h1>Loading</h1> :

        <div id="map" style={{position: "relative"}}>

          <SimpleForm location={this.props.location} update={this._handleSimpleFormInput} />

                <MyMap
                    containerElement={
                      <div style={{ height: `100%`, width: '100%'}} />
                    }
                    mapElement={
                      <div style={{ height: `100%`, width: '100%'}} />
                    }
                    marker={this.state.marker}
                />

        </div>

    )
  }
}
}

export default Map;
