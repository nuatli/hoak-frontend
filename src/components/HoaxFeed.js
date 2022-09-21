import React, { useEffect,useState } from 'react';
import { getHoaxes } from '../api/apiCalls';

const HoaxFeed = () => {
    const [hoaxPage,setHoaxPage] = useState({content:[]})

    useEffect( () => {
        loadHoaxes();
    },[]);


    const loadHoaxes = async () => {
        try {
            const response = await getHoaxes();
            setHoaxPage(response.data);
        }catch(error){

        }
    }

    useEffect( () => {
        console.table(hoaxPage.content)
    },[hoaxPage]);

    return (
        <div>

        </div>
    )

}

export default HoaxFeed;