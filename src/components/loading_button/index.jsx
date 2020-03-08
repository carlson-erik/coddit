import React from "react";

const LoadingButton = ({loadFunc, isLoading, itemLimit})  => {
	return(
		<div className="loadingButton" onClick={loadFunc}>
			{ isLoading
				? <div className="loadingText" >loading</div>
				: <div className="loadingText">load next {itemLimit}</div>
			}
		</div>
	)
};

export default LoadingButton;