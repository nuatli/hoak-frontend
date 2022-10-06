import React, { useEffect,useState } from 'react';
import { getHoaxes, deleteHoax } from '../api/apiCalls';
import {useSelector} from 'react-redux'; 
import {useTranslation} from 'react-i18next';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import Modal from './Modal';
import {useApiProgress} from '../shared/ApiProgress';

const HoaxView = (props) => {
    const loggedInUserUserName = useSelector(store => store.authReducer.username);
    const {i18n,t} = useTranslation();
    const {hoax,onDeleteHoax} =props;
    const {user,content,timestamp,fileAttachment,id} = hoax;
    const {username,displayName,image} = user;
    const [modalVisible,setModalVisible] = useState(false);

    const pendingApiCall = useApiProgress("delete",`/api/0.0.1/hoaxes/${id}`,true);

    const formatted = format(timestamp,i18n.language);
    const ownedByLoggedInUser = loggedInUserUserName === username;

    const onClickHandler = () => {
       setModalVisible(true);
    }

    const onClickDeleteHandler = async() => {
         await deleteHoax(id);
         onDeleteHoax(id);
     }

    const onClickCancel = () => {
        setModalVisible(false);
    }

    return(
        <>
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
                    {
                        ownedByLoggedInUser && (
                            <button className="btn btn-delete-link btn-sm" onClick={onClickHandler}>
                                <i className="material-icons">delete_outline</i>                        
                            </button>
                        )
                    } 
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
            <Modal 
                visible={modalVisible} 
                onClickCancel={onClickCancel} 
                message = {
                    <div>
                        <div><strong>{t('Are you sure to delete hoax ?')}</strong></div>
                        <div>{content}</div>
                    </div>
                }
                title={t('Delete Hoax')}
                onClickConfirm = {onClickDeleteHandler}
                pendingApiCall = {pendingApiCall}
            />
        </>
    )

}

export default HoaxView;