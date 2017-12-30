import React from 'react'

class SearchLocationPage extends React.Component {

  _handleSubmit = () => {
    console.log("Hello");
  }

  render() {
    return (
      <div className="search-locationpage">
        <form className="search-form" onSubmit={this._handleSubmit}>
            <input ref="userInput" className="search-page__input" type="text" placeholder={this.props.location} />

        </form>
      </div>
    )
  }
}

export default SearchLocationPage;

// <i className="fa fa-search fa-3x" aria-hidden="true" onClick={this._handleSubmit}></i>
