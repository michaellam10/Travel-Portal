import React from 'react';
import Photo from './Photo';
import Unsplash from 'unsplash-js';
import SearchLocationPage from './SearchLocationPage';
import Welcome from './Welcome';
import Weather from './Weather';
var Carousel = require('nuka-carousel');
import Map from './Map';
//import $ from 'jquery';
import StickyNav from './StickyNav';
// import BackToTopButton from './BackToTopButton';
import CardStack from './CardStack'
import CardStack2 from './CardStack2'


const unsplash = new Unsplash({
  applicationId: "11e1462b850f15f3bd6229d5e31decf03120ea80ee517833372205f6f97c89d5",
  secret: "58af4509c85539737207f84b3dbd6308839ea9e46ed93c4fb8f197ac1cfba911",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

class LocationPage extends React.Component {

  state = {
    q: [],
    photoSet1: [],
    photoSet2: [],
    placesToEatSet1: [],
    placesToEatSet2: [],
    thingsToDoSet1: [],
    thingsToDoSet2: [],
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      q: JSON.parse(this.props.location.query.q),
    }, () => {
      this.fetchPhotos(this.state.q.locationPassName)
      // this.fetchPlaceID(this.state.q.locationPassName)
      this.fetchPlacesToEat(this.state.q.locationPassName)
      this.fetchThingsToDo(this.state.q.locationPassName)
      this.setState({
        mapLocation: this.state.q.locationPassName
      })
    })
  }

  fetchTime = (timestamp, timezone) => {
    this.setState({timestamp, timezone}, () => {
      console.log(this.state.timestamp);
      console.log(this.state.timezone);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.location.query.q !== prevProps.location.query.q){
      this.fetchData()
    }
  }

  fetchPlaceID = (location) => {
    fetch(`https://tranquil-mesa-55460.herokuapp.com/textsearch?query=${location}`)
      .then((res) => res.json())
      .then((data) => {
        var placeID = data.data.results[0].place_id;
        this.fetchPlaceInfo(placeID)
        console.log('data', data)
      })
  }

  fetchThingsToDo = (location) => {
    fetch(`https://tranquil-mesa-55460.herokuapp.com/activities?query=${location}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

            var activities = data.data.businesses;
            this.setState({
              thingsToDoSet1: activities.slice(0,10),
              thingsToDoSet2: activities.slice(10,20)
            }, () => {
              console.log('thingsToDoSet1', this.state.thingsToDoSet1)
              console.log('thingsToDoSet2', this.state.thingsToDoSet2)
            })

      })
  }

    fetchPlaceInfo = (placeID) => {
      fetch(`https://tranquil-mesa-55460.herokuapp.com/details?placeid=${placeID}`)
      .then((res) => res.json())
      .then((data) => {
        var photoReference = data.data.result.photos[0].photo_reference;
        this.fetchPhoto(photoReference);
        console.log('photo reference', photoReference)
        console.log('data', data)
      })
    }

    fetchPhoto = (photoReference) => {
      fetch(`https://tranquil-mesa-55460.herokuapp.com/photos?query=${photoReference}`)
      .then((data) => {
        console.log('photo', data)
      })
    }

      fetchPlacesToEat = (location) => {
       fetch(`https://tranquil-mesa-55460.herokuapp.com/food?query=${location}`)

       .then((res) => res.json())
       .then((data) => {
         console.log(data);
         const restaurants = data.data.businesses;

             this.setState({
               placesToEatSet1: restaurants.slice(0,10),
               placesToEatSet2: restaurants.slice(10,20)
             }, () => {
               console.log('placesToEatSet1', this.state.placesToEatSet1)
               console.log('placesToEatSet2', this.state.placesToEatSet2)
             })
        
       })
     }

  fetchPhotos = (locationName) => {
      unsplash.photos.searchPhotos(locationName, [], 1, 20)
      .then((res)=>{
        return res.json();
      })
      .then((photos) => {
        this.setState({
          photoSet1: photos.slice(0,10),
          photoSet2: photos.slice(10,20)
        })
      });
  }

  _handleSimpleFormInput = (mapLocation) => {
    this.setState({mapLocation}, () => {
      console.log(this.state.mapLocation)
    })
  }

  render() {

    var numRestaurants = this.state.placesToEatSet1.length + this.state.placesToEatSet2.length;
    var numActivities = this.state.thingsToDoSet1.length + this.state.thingsToDoSet2.length;
    console.log('numRestaurants', numRestaurants);
    console.log('numActivities', numActivities);

    var timeReady = 1;
    if(this.state.q.length < 2 || !this.state.timestamp || !this.state.timezone){
      timeReady = 0;
    }

    if(this.state.thingsToDoSet1 === null && this.state.thingsToDoSet2 === null){
      var activities = 0;
    }
    else{
      var activities = 1;
    }

    if(!this.state.placesToEatSet1 && !this.state.placesToEatSet2){
      var restaurants = 0;
    }
    else{
      var restaurants = 1;
    }

    return (
      <div className="location-page">

        <main className="location-content">

          <Carousel slidesToShow={1} width="100%" cellAlign="center" dragging={true} speed={600} autoplay={true} wrapAround={true}>
            {this.state.photoSet1.map((photo, index) => {
              return <Photo key={index} url={photo.urls.full}/>
            })}
          </Carousel>

          <div className="location-header">
            {this.state.q.length < 2 ? <h1>Loading...</h1> : <SearchLocationPage location={this.state.q.locationDisplayName}/>}
          </div>

          {this.state.q.length < 2 ? <h1>Loading...</h1> : <StickyNav location={this.state.q.locationDisplayName}/>}

          <div id="row1">
              {timeReady === 0 ? <h1>Loading...</h1> : <Welcome timestamp={this.state.timestamp} timezone={this.state.timezone} location={this.state.q.locationPassName}/>}
              {!this.state.mapLocation ? <h1>Loading...</h1> : <Map location={this.state.mapLocation}/>}

          </div>

          <div>
          {numActivities < 20 ? <h1>Loading...</h1>
                 :  <div id="activities">
                        <CardStack
                          elements1={this.state.thingsToDoSet1}
                          elements2={this.state.thingsToDoSet2}
                          elementHeight={200}
                          elementsCount={10}
                          handleSimpleFormInput={this._handleSimpleFormInput}
                        />
                   </div>
                }



            {numRestaurants < 20 ? <h1>Loading...</h1> :
              <div id="restaurants">
                <CardStack2
                  elements1={this.state.placesToEatSet1}
                  elements2={this.state.placesToEatSet2}
                  elementHeight={200}
                  elementsCount={10}
                  handleSimpleFormInput={this._handleSimpleFormInput}
                  />
              </div>
            }

          </div>

          {this.state.q.length < 2 ? <h1>Loading...</h1> : <Weather fetchTime={this.fetchTime} location={this.state.q.locationPassName}/>}

          <div id="gallery">

            <Carousel slidesToShow={1} width="100%" cellAlign="center" dragging={true} speed={600} wrapAround={true}>
              {this.state.photoSet2.map((photo, index) => {
                return <Photo key={index} url={photo.urls.full} />
              })}
            </Carousel>

          </div>

        </main>

      </div>
    )
  }
}

export default LocationPage;

// {numActivities < 20 ? <h1>Loading</h1> :
//   <div id="activities">
//          <CardStack
//            elements1={this.state.thingsToDoSet1}
//            elements2={this.state.thingsToDoSet2}
//            elementHeight={200}
//            elementsCount={10}
//            handleSimpleFormInput={this._handleSimpleFormInput}
//          />
//     </div>
// }
