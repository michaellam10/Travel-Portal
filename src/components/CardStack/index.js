import React from 'react';
import PropTypes from 'prop-types'
import Card from '../Card'
import Card2 from '../Card2'
import './index.css'

class CardStack extends React.Component {

	render() {
		return (
			<div className="card-stack">
				<Card elements1={this.props.elements1}
					elements2={this.props.elements2}
					elementHeight={200}
					elementsCount={this.props.elementsCount}
					handleSimpleFormInput={this.props.handleSimpleFormInput} />
			</div>
		)
	}
};

export default CardStack;
