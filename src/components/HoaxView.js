import React, { useEffect,useState } from 'react';
import { getHoaxes } from '../api/apiCalls';
import {useTranslation} from 'react-i18next';

const HoaxView = (props) => {
    const {hoax} =props;
    return(
        <div className="card p-1">
            {hoax.content}
        </div>
    )

}

export default HoaxView;