import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynLabel from '../../General/components/DynLabel';

class InputForm extends Component {
    constructor(props) {
		super(props);
		this.state = {
			textEmpty: true,
        }
        this.updateInputValue = this.updateInputValue.bind(this);
	}

	componentDidMount() {
		console.log(this.props);
		if (this.props.value !== undefined && this.props.value !== '') {
			this.setState({
				textEmpty: false,
			})
		}
	}

    updateInputValue = (evt) => {
		evt.preventDefault();
		if (evt.target.value) {
			this.setState({
				textEmpty: false,
			});
		} else {
			this.setState({
				textEmpty: true,
			});
		}
		this.props.onUpdate(this.props.name, evt.target.value);
	};

    render() {
        return (
            <div className={this.props.containerClass}>
                <DynLabel 
                    isEmpty={this.state.textEmpty}
                    textValue={this.props.textValue}
                />
                <input
					name={this.props.name}
					type={this.props.type}
					value={this.props.value}
                    className={this.props.inputClass}
                    onChange={this.updateInputValue}
                />
				{this.props.errorMessage !== '' &&
				<span className="form-error-message">{ this.props.errorMessage }</span>}
            </div>
        );
    }
}

InputForm.propTypes = {
    containerClass: PropTypes.string,
    textValue: PropTypes.string,
    type: PropTypes.string,
	inputClass: PropTypes.string,
	value: PropTypes.string
}

export default InputForm;