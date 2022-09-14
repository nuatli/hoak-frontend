import React from 'react';

const ButtonWithProgress = (props) => {
	const {onClick, pendingApiCall,disabled,text,className} = props;
	return(
            <div className="text-center">
	        	<button className={className} onClick={onClick} disabled={disabled }>
	        		{pendingApiCall && <span className="spinner-border spinner-border-sm " style={{marginRight:5}}></span> }
	        		{text}
	        	</button>
	        </div>		
	)
}

export default ButtonWithProgress;