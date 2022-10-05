import React from 'react';
import defaultPicture from '../assets/avatar.png';

const ProfileImageWithDefault = props => {
    const {image,tempimage} = props; 
    
    let imageSource = defaultPicture;
	if(image) {
		imageSource = '/images/profile/' + image;
    }
    //console.log(tempimage);
    
    return(
        <img alt={`profile`} src={tempimage || imageSource}  {...props} onError = { event => {event.target.src = defaultPicture}} />
    );
}

export default  ProfileImageWithDefault;