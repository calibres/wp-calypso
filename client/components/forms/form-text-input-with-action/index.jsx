/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { keys, omit, noop } from 'lodash';

/**
 * Internal dependencies
 */
import FormTextInput from 'components/forms/form-text-input';
import FormButton from 'components/forms/form-button';

export default React.createClass( {
	displayName: 'FormTextInputWithAction',

	propTypes: {
		action: PropTypes.node,
		inputRef: PropTypes.func,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func,
		onKeyDown: PropTypes.func,
		onChange: PropTypes.func,
		onAction: PropTypes.func,
		defaultValue: PropTypes.string,
		disabled: PropTypes.bool,
		isError: PropTypes.bool,
		isValid: PropTypes.bool,
	},

	getDefaultProps() {
		return {
			defaultValue: '',
			onFocus: noop,
			onBlur: noop,
			onKeyDown: noop,
			onChange: noop,
			onAction: noop,
			isError: false,
			isValid: false,
		};
	},

	getInitialState() {
		return {
			focused: false,
			value: null,
		};
	},

	handleFocus( e ) {
		this.props.onFocus( e );
		if ( e.defaultPrevented ) {
			return;
		}
		this.setState( {
			focused: true,
		} );
	},

	handleBlur( e ) {
		this.props.onBlur( e );
		if ( e.defaultPrevented ) {
			return;
		}
		this.setState( {
			focused: false,
		} );
	},

	handleKeyDown( e ) {
		this.props.onKeyDown( e );
		if ( e.defaultPrevented ) {
			return;
		}
		if ( e.which === 13 && this.getValue() !== '' ) {
			this.props.onAction( e );
		}
	},

	handleChange( e ) {
		this.props.onChange( e );
		if ( e.defaultPrevented ) {
			return;
		}
		this.setState( {
			value: e.target.value,
		} );
	},

	getValue() {
		if ( this.state.value === null ) {
			return this.props.defaultValue;
		}
		return this.state.value;
	},

	render() {
		return (
			<div
				className={ classNames( 'form-text-input-with-action', {
					'is-focused': this.state.focused,
					'is-disabled': this.props.disabled,
					'is-error': this.props.isError,
					'is-valid': this.props.isValid,
				} ) }
			>
				<FormTextInput
					className="form-text-input-with-action__input"
					ref={ this.props.inputRef }
					disabled={ this.props.disabled }
					defaultValue={ this.props.defaultValue }
					onChange={ this.handleChange }
					onFocus={ this.handleFocus }
					onBlur={ this.handleBlur }
					onKeyDown={ this.handleKeyDown }
					{ ...omit( this.props, keys( this.constructor.propTypes ) ) }
				/>
				<FormButton
					className="form-text-input-with-action__button is-compact"
					disabled={ this.props.disabled || this.getValue() === '' }
					onClick={ this.props.onAction }
				>
					{ this.props.action }
				</FormButton>
			</div>
		);
	}
} );
