import React, { PropTypes } from 'react'

var address = [];

class CardCollapsable extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  _handleClick = (index) => {

    console.log(address[index]);
    this.props.handleSimpleFormInput(address[index]);

  }

  render() {

      return (
        <div className="card-collsable">
          <div className="activities-left-col">
            {this.props.elements1.map((el, index) => {

              var activitiesImage = el.image_url;
              var locationAddress = el.location.display_address[0];
              address.push(locationAddress);
              console.log(address);


              return (
                <div className="card-list__item" key={index}>
                  <div className="card-list-content">
                    <div className="activities-info">
                      <h2><a href={el.url} target="_blank">{el.name}</a></h2>
                      <p>{el.categories[0].title}</p>
                      <p>Address: <a href="#map" onClick={this._handleClick.bind(this, index)}>{el.location.display_address[0]}</a></p>
                      <p>Contact: {el.display_phone}</p>
                    </div>
                    <div className="activities-image" style={{
                        'backgroundImage': 'url(' + activitiesImage + ')',
                        'backgroundSize': 'cover',
                        'backgroundPosition': 'center',
                        'border': '2px solid #D3D3D3'
                      }}>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="activities-right-col">
            {this.props.elements2.map((el, index) => {

              var activitiesImage = el.image_url;
              var index = index += 10;
              var locationAddress = el.location.display_address[0];
              address.push(locationAddress);
              console.log(address);

              return (
                <div className="card-list__item" key={index}>
                  <div className="card-list-content">
                    <div className="activities-info">
                      <h2><a href={el.url} target="_blank">{el.name}</a></h2>
                      <p id="category">{el.categories[0].title}</p>
                      <p>Address: <a href="#map" onClick={this._handleClick.bind(this, index)}>{el.location.display_address[0]}</a></p>
                      <p>Contact: {el.display_phone}</p>
                    </div>
                    <div className="activities-image" style={{
                        'backgroundImage': 'url(' + activitiesImage + ')',
                        'backgroundSize': 'cover',
                        'backgroundPosition': 'center',
                        'border': '2px solid #D3D3D3'
                      }}>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
}

export default CardCollapsable
