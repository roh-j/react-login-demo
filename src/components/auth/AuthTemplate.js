import React from 'react';
import '../../resources/css/bootstrap.css';
import '../../resources/css/auth-template.css';


const AuthTemplate = ({ children }) => {
	return (
		<>
			<h3 className='text-center'>Login</h3>
			<hr />
			{children}
		</>
	);
}

export default AuthTemplate;