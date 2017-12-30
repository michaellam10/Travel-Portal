import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }

  componentDidMount() {
    this.updateFieldAddress(this.props.location);
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.location != prevProps.location){
      this.updateFieldAddress(this.props.location);
    }
  }

  updateFieldAddress = (address) => {
    this.setState({address}, () => {
      console.log(this.state.address);
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))

    // Child component updates props of parent component
      this.props.update(this.state.address);
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <form style={{boxSizing: "border-box", zIndex: "10", position: "absolute", top: "5px", width: "400px", right: "5px"}} onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <button style={{textAlign: "right !important", float: "right !important", right: "5px"}} type="submit">Submit</button>
      </form>
    )
  }
}

export default SimpleForm
