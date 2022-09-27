import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHoaxes } from '../api/apiCalls';
import {useTranslation} from 'react-i18next';
import HoaxView from './HoaxView';
import {useApiProgress} from '../shared/ApiProgress';
import Spinner from './Spinner';

const HoaxFeed = () => {
    const {t} = useTranslation();
    const { username } = useParams(); //<Route path="/user/:username" component={UserPage} /> App.jsdeki
    const [hoaxPage,setHoaxPage] = useState({content:[],last:true,number : 0});

    const path = username ? `/api/0.0.1/users/${username}/hoaxes?page=` : `/api/0.0.1/hoaxes?page=`
    const pendingApiCall = useApiProgress("get",path);

    useEffect( () => {
        loadHoaxes();
    },[]);

    const { content,last,number } = hoaxPage;

   

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
        loadHoaxes(number+1);
    } 

   

    if(content.length === 0){
        return (
            <div className = "alert alert-secondary text-center">
                {pendingApiCall ?  <Spinner /> : t('There are no hoaxes')}
            </div>
        )
    }
    return (
        <div>
            {content.map(hoax => {
                return <HoaxView key={hoax.id} hoax={hoax} />
            })}
            {!last && 
                pendingApiCall ?
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