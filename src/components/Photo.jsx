import React from 'react';

class Photo extends React.Component {



  render() {

    var photoStyle = {
      backgroundImage: `url(${this.props.url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };

    return (
      <div className="picture" style={photoStyle}>
        
      </div>
    )
  }

}

export default Photo;

// <div className="picture">
//   <img src={this.props.url} alt='Location'/>
// </div>
