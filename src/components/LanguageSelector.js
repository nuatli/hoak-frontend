import React from 'react';
import {withTranslation} from 'react-i18next';
import {changeLanguage} from '../api/apiCalls';
import trFlag from '../assets/turkey-flag-png-large.png';
import enFlag from '../assets/united-kingdom-flag-png-large.png';
const LanguageSelctor = (props) => {
	const onChangeLanguage = language => {
		const {i18n} = props;
		i18n.changeLanguage(language); 
		changeLanguage(language);
	}
	return(
		<div className="container">
			<img src={trFlag} alt="Turkish Flag" onClick={()=> onChangeLanguage('tr')} style={{cursor:'pointer'}} />
			<img src={enFlag} alt="USA flag" onClick={()=> onChangeLanguage('en')} style={{marginLeft:10,cursor:'pointer'}} />
		</div>
	);
};


export default withTranslation()(LanguageSelctor);
