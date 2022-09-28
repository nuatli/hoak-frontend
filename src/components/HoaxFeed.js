import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHoaxes, getOldHoaxes } from '../api/apiCalls';
import {useTranslation} from 'react-i18next';
import HoaxView from './HoaxView';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from './Spinner';

const HoaxFeed = () => {
    const {t} = useTranslation();
    const { username } = useParams(); //<Route path="/user/:username" component={UserPage} /> App.jsdeki
    const [hoaxPage,setHoaxPage] = useState({content:[],last:true,number : 0});

    const path = username ? `/api/0.0.1/users/${username}/hoaxes?page=` : `/api/0.0.1/hoaxes?page=`
    const initialHoaxLoadProgress = useApiProgress("get",path);

    let lastHoaxId = 0;
    
    if(hoaxPage.content.length > 0){
        const lastHoaxIndex = hoaxPage.content.length -1 ;
        lastHoaxId = hoaxPage.content[lastHoaxIndex].id;
    }
    
    const oldHoaxPath = username ? `/api/0.0.1/users/${username}/hoaxes/${lastHoaxId}` : `/api/0.0.1/hoaxes/${lastHoaxId}`;
    const loadOldHoaxProgress = useApiProgress("get",oldHoaxPath,true);

    useEffect( () => {
        loadHoaxes();
    },[]);

    const { content,last } = hoaxPage;

   

    const loadHoaxes = async (page) => {
        try {
            const response = await getHoaxes(username,page);
            //setHoaxPage(response.data);
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content:[...previousHoaxPage.content,...response.data.content]
            })); // Geçmiş bilgileri almak için
        }catch(error){

        }
    }

    const onClickHandler = () => {
        loadOldHoaxes();
    } 

    const loadOldHoaxes = async () => {
   
        
        try {
            const response = await getOldHoaxes(lastHoaxId,username);
            setHoaxPage(previousHoaxPage => ({
                ...response.data,
                content:[...previousHoaxPage.content,...response.data.content]
            })); // Geçmiş bilgileri almak için
        }catch(error){
            console.error(error);
        }

    }

   

    if(content.length === 0){
        return (
            <div className = "alert alert-secondary text-center">
                {initialHoaxLoadProgress ?  <Spinner /> : t('There are no hoaxes')}
            </div>
        )
    }
    return (
        <div>
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax} />
            })}
            {!last && 
                loadOldHoaxProgress ?
                (
                    <div className = "alert alert-secondary text-center mt-1" > 
                        <Spinner />
                    </div>
                )
                : 
                (
                    <div className = "alert alert-secondary text-center mt-1" style={{cursor:'pointer'}} onClick={onClickHandler}>
                        {t('Load Old Hoaxes') }
                    </div>
                )
            }
        </div>
    )
    

}

export default HoaxFeed;