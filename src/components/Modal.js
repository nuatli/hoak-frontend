import React from 'react';
import {useTranslation} from 'react-i18next';
import ButtonWithProgress from './ButtonWithProgress';


const Modal = props => {
    const {t} = useTranslation();
    const { visible ,onClickCancel,message,onClickConfirm,pendingApiCall} = props;
    let className = "modal fade";
  
    if(visible){
        className += " show d-block";
    } 

    console.log(pendingApiCall)
    return(
        
            <div className={className} style={{backgroundColor:"#000000b0"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('Delete Hoax')}</h5>                           
                        </div>
                        <div className="modal-body">{message}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClickCancel} disabled={pendingApiCall} >{t('Cancel')}</button>
                            <ButtonWithProgress 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={onClickConfirm}  
                                text={t('Delete Hoax')}
                                pendingApiCall={pendingApiCall}
                                disabled={pendingApiCall}
                            />
                               
                            
                        </div>
                    </div>
                </div>
            </div>
        
    )
}

export default Modal;