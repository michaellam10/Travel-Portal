import React from 'react';
import PropTypes from 'prop-types'
import './index2.css'
import CardCollapsable2 from './CardCollapsable2'

class Card2 extends React.Component {

	static propTypes = {
		containerHeight: PropTypes.number
	}

	state = {
		containerHeight: 84,
		isExpanded: false,
		headerHeight: 84
	}

	handleExpansion = () => {
		if(!this.state.isExpanded) {
			const elementsCount = this.props.elementsCount + 1
			const containerHeight = (this.props.elementHeight * elementsCount) + this.state.headerHeight;
			this.setState({
				containerHeight: containerHeight,
				isExpanded: true
			})
		} else {
			this.setState({
				containerHeight: 84,
				isExpanded: false
			})
		}
	}

	render() {
		return (
			<div className="card2" style={{
					height: this.state.containerHeight + 'px'
				}}>
				<div className="card-header2"
					style={{
						height: this.state.headerHeight + 'px',
						backgroundColor: "#286da8"
					}}
					onClick={this.handleExpansion}>
					<div className="card-header-content2">
						<div className="title">
							<i className="fa fa-angle-down" aria-hidden="true" style={{fontSize: "40px", marginRight: "30px", color: "#285396"}}></i>
							 	Places to eat
							<i className="fa fa-angle-down" aria-hidden="true" style={{fontSize: "40px", marginLeft: "30px", color: "#285396"}}></i>
							</div>
					</div>
				</div>


				<CardCollapsable2
					elements1={this.props.elements1}
					elements2={this.props.elements2}
					handleSimpleFormInput={this.props.handleSimpleFormInput}  />


	</div>
		)
	}
};

export default Card2;
