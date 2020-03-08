import React from "react";

const Checkbox = (props) => {
	return(
		<label className="checkboxContainer">
			<input 
				type="checkbox" 
				checked={props.checked}
				{...props}
			/>
			<span className="checkmark"></span>
		</label>
	);
}

export default Checkbox;