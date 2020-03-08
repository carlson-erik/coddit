import React  from "react";

const Image = ({imageURL, imageTitle}) => {
	let image;
	if(imageURL.substring(imageURL.length - 4) === "gifv"){
		// gifvs should be rendered as an mp4
		const updatedLink = imageURL.replace("gifv", "mp4");
		image = <video preload="auto" autoPlay="autoplay" loop="loop" className="shownImage">
							<source src={updatedLink} type="video/mp4"></source>
						</video>;
	} else {
		image = <img className="shownImage" src={imageURL} alt={imageTitle}/>;
	}
	return (
		<div className='line'>
			{image}
		</div>
	); 
}

export default Image;