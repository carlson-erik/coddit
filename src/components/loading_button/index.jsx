import React from "react";

const LoadingButton = ({loadFunc, isLoading, postLimit})  => {
	return(
		<div className="loadingButton" onClick={loadFunc}>
			{ isLoading
				? <div className="loadingText" >loading</div>
				: <div className="loadingText">load next {postLimit}</div>
			}
		</div>
	)
};

export default LoadingButton;