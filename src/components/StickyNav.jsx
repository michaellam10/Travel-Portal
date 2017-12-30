import React from 'react';
import StickySearch from './StickySearch';
import ExpandedNav from './ExpandedNav';

class StickyNav extends React.Component {

  constructor() {
    super();
    this.state = {
      showExpandedNav: false
    }
  }

  _handleClick = () => {
    // e.preventDefault();
    this.setState({showExpandedNav: !this.state.showExpandedNav})
  }


  render() {
    return (
    <div className="nav">
      <div className="sticky-nav">
        <div id="nav-collapsible">
          <div id="nav-icon">
            <i onClick={this._handleClick} className="fa fa-bars fa-2x" aria-hidden="true"></i>
          </div>
          {this.state.showExpandedNav && <ExpandedNav onClick={this._handleClick} toggle={this.state.showExpandedNav}/>}
        </div>
        <div className="sticky-nav-buttons">
        <a href="#welcome"><div className="sticky-nav-item">
            <h2>Info</h2>
          </div></a>
        <a href="#map"><div className="sticky-nav-item">
              <h2>Map</h2>
            </div></a>
          <a href="#activities"><div className="sticky-nav-item">
              <h2>Things to do</h2>
            </div></a>
          <a href="#restaurants"><div className="sticky-nav-item">
              <h2>Places to eat</h2>
            </div></a>
          <a href="#weather"><div className="sticky-nav-item">
              <h2>Weather</h2>
            </div></a>
          <a href="#gallery"><div className="sticky-nav-item">
              <h2>Gallery</h2>
            </div></a>
        </div>
        <div className="sticky-nav-search">
          <StickySearch location={this.props.location}/>
        </div>
      </div>
    </div>
    
    )
  }

}

export default StickyNav;
