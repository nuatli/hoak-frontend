import React, { useEffect,useState } from 'react';
import { getHoaxes } from '../api/apiCalls';
import {useTranslation} from 'react-i18next';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';

const HoaxView = (props) => {
    const {i18n} = useTranslation();
    const {hoax} =props;
    const {user,content,timestamp,fileAttachment} = hoax;
    const {username,displayName,image} = user;
    const formatted = format(timestamp,i18n.language);
    return(
        <div className="card p-1 m-1">
            <div className="d-flex">
                <ProfileImageWithDefault image={image} width="32" height="32" className="rounded m-1" />
                <div className="flex-fill m-auto pl-2">
                    <Link to={`/user/${username}`} className="text-dark ">
                        <h6 className="d-inline">{displayName}@{username}</h6>
                        <span> - </span>
                        <span>{formatted}</span>
                    </Link>
                </div>
            </div>
            <div className="pl-5">{content}</div> 
            {fileAttachment && 
                <div className="pl-5 pr-5">
                    {
                        fileAttachment.fileType.startsWith('image') && (
                            <img className="img-fluid" src={'images/attachments/'+fileAttachment.name} alt={content} />
                        )                     
                    }
                    {
                        !fileAttachment.fileType.startsWith('image') && (
                            <strong>Hoax has not supported attachment</strong>
                        )                     
                    }                    
                </div>
            }

        </div>
    )

}

export default HoaxView;