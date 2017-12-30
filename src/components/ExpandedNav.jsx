import React from 'react';

class ExpandedNav extends React.Component {

  constructor() {
    super();
    this.state = {

    }
  }

  _handleClick = (e) => {
    this.props.onClick();
  }

  render() {
    return (
      <div id="expanded-nav-menu-shell">
        <div id="expanded-nav-menu">
        <a href="#welcome"><div onClick={this._handleClick} className="sticky-nav-item">
            <h2>Info</h2>
          </div></a>
        <a href="#map"><div onClick={this._handleClick} className="sticky-nav-item">
              <h2>Map</h2>
            </div></a>
          <a href="#activities"><div onClick={this._handleClick} className="sticky-nav-item">
              <h2>Things to do</h2>
            </div></a>
          <a href="#restaurants"><div onClick={this._handleClick} className="sticky-nav-item">
              <h2>Places to eat</h2>
            </div></a>
          <a href="#weather"><div onClick={this._handleClick} className="sticky-nav-item">
              <h2>Weather</h2>
            </div></a>
          <a href="#gallery"><div onClick={this._handleClick} className="sticky-nav-item">
              <h2>Gallery</h2>
            </div></a>
        </div>
      </div>
    )
  }
}

export default ExpandedNav;
