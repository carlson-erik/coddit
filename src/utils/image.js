// This method simply gets the file extension of the image that the URL is 
// linking to
const getImageURLExt = (url) => {
	return url.substring(url.length - 4);
}

// This method determines if the link is to a gif 
const isGifLink = (url) => {
	const fileExtension = getImageURLExt(url);
	return fileExtension === ".gif" || 
		   fileExtension === "gifv";
}

// This method determines if the link is a direct link to an image
// Extensions include: jpg, png, gif, gifv
const isImageLink = (url) => {
	const fileEnding = getImageURLExt(url);
	switch(fileEnding){
		case '.jpg':
		case '.png':
		case '.gif':
		case 'gifv':
			return true;
		default:
			return false;
	}
}
export { getImageURLExt, isImageLink, isGifLink };