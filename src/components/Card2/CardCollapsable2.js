import React, { PropTypes } from 'react'

const CardCollapsable2 = (props) => {
  return (
    <div className="card-collsable2">
      <div className="restaurant-left-col">
        {props.elements1.map((el, index) => {

          var restaurantImage = el.image_url;


          return (
            <div className="card-list__item" key={index}>
              <div className="card-list-content">
                <div className="restaurant-info">
                  <h2><a href={el.url} target="_blank">{el.name}</a></h2>
                  <p>Address: <a href="#map">{el.location.display_address[0]}</a></p>
                  <p>Contact: {el.display_phone}</p>
                </div>
                <div className="restaurant-image" style={{
                    'backgroundImage': 'url(' + restaurantImage + ')',
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
      <div className="restaurant-right-col">
        {props.elements2.map((el, index) => {

          var restaurantImage = el.image_url;


          return (
            <div className="card-list__item" key={index}>
              <div className="card-list-content">
                <div className="restaurant-info">
                  <h2><a href={el.url} target="_blank">{el.name}</a></h2>
                  <p>Address: <a href="#map">{el.location.display_address[0]}</a></p>
                  <p>Contact: {el.display_phone}</p>
                </div>
                <div className="restaurant-image" style={{
                    'backgroundImage': 'url(' + restaurantImage + ')',
                    'backgroundSize': 'cover',
                    'backgroundPosition': 'center',
                    'border': '2px solid #B3B3B3'
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

export default CardCollapsable2;
