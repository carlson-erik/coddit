import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.label`
	display: inline-block;
  position: relative;
  cursor: pointer;
  margin-left: 8px;
  height: 14px;
	width: 14px;
`;

const Input = styled.input`
	cursor: pointer;
	opacity: 0;
	height: 0;
	width: 0;
`;

const Checkmark = styled.span`
	position: absolute;
	top: 3px;
	left: 0;
	height: 14px;
	width: 14px;
	background-color: ${props => props.bgColor ? props.bgColor : 'none'};
	outline: 1px solid ${props => props.outlineColor ? props.outlineColor : 'none'};
	&:hover {
		background-color: ${props => props.bgColorHover ? props.bgColorHover : props.checkCheckedColor};
	}

	&:hover:after {
		border-color: ${props => props.checked ? props.checkCheckedColor
																					 : (props.checkColorHover ? props.checkColorHover : props.bgColor)};
	}

	&:after {
		content: "";
		position: absolute;
		z-index: 100;
		border: solid ${props => props.checked ? props.checkCheckedColor : 'none'};
		border-width: 0 2px 2px 0;
		left: 4px;
		width: 4px;
		height: 9px;
		transform: rotate(45deg);
	}`;

/* 
	------- Color Props -------
	bgColor => required
	checkCheckedColor => required 
	bgColorHover => optional
	checkColor => optional
	checkColorHover => optional
	outlineColor => optional
	------- Color Props -------
*/

const Checkbox = (props) => {
	const {bgColor, checkCheckedColor} = props;
	const defaultedProps = {
		bgColor,
		checkCheckedColor, 
		outlineColor: props.outlineColor ? props.outlineColor : checkCheckedColor,
		bgColorHover: props.bgColorHover ? props.bgColorHover : bgColor,
		checkColor: props.checkColor ? props.checkColor : bgColor,
		checkColorHover: props.checkColorHover ? props.checkColorHover : bgColor
	}
	return(
		<Container>
			<Input 
				type="checkbox" 
				checked={props.checked}
				{...props}
			/>
			<Checkmark checked={props.checked} {...defaultedProps}/>
		</Container>
	);
}

Checkbox.propTypes = {
	bgColor : PropTypes.string.isRequired,
	checkCheckedColor : PropTypes.string.isRequired,
	outlineColor : PropTypes.string,
	bgColorHover : PropTypes.string,
	checkColor : PropTypes.string,
	checkColorHover : PropTypes.string,
}

export default Checkbox;