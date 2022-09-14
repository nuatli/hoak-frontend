import React from 'react';
import defaultPicture from '../assets/avatar.png';

const ProfileImageWithDefault = (props) => {
    const {image,tempimage} = props; 
    
    let imageSource = defaultPicture;
	if(image) {
		imageSource =  image;
    }
    
    return(
        <img alt={`profile`} src={tempimage || imageSource}  {...props}/>
    );
}

export default  ProfileImageWithDefault;