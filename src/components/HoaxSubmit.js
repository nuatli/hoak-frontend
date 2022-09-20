import React from 'react';
import { useSelector }  from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const HoaxSubmit = () => {
    const { image } = useSelector((store) => ({image:store.authReducer.image}));
    console.log(image);
    return(
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault image = {image} width="32" height="32" className="rounded-circle mr-1" />
            <div className="flex-fill">
                <textarea className="form-control"/>
                <div className="text-right mt-2">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>

        </div>
    )
}

export default HoaxSubmit;