import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
	return (
		<div className='container auth-template'>
			<AuthTemplate>
				<LoginForm />
			</AuthTemplate>
		</div>
	);
}

export default LoginPage;