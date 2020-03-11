import React from "react";
import styled from 'styled-components';

const SizedImage = styled.img`
  max-width: 60%;
  max-height: 60%;
`;

const SizedVideo = styled.video`
  max-width: 60%;
  max-height: 60%;
`;

const Image = ({ imageURL, imageTitle }) => {
  let image;
  if (imageURL.substring(imageURL.length - 4) === "gifv") {
    // gifvs should be rendered as an mp4
    const updatedLink = imageURL.replace("gifv", "mp4");
    image = (
      <SizedVideo preload="auto" autoPlay="autoplay" loop="loop">
        <source src={updatedLink} type="video/mp4"></source>
      </SizedVideo>
    );
  } else {
    image = (
      <SizedImage src={imageURL} alt={imageTitle} />
    );
  }
  return (
    <div className='line'>
      {image}
    </div>
  );
}

export default Image;