import React from 'react';
import '../../resources/css/bootstrap.css';

/*
	컴포넌트 구조 변경 필요: Login / Register Form 화면만 다루도록 개선 필요
 */
const AuthForm = ({ type, form, onChange, onSubmit, onLogout, loaded, user, error }) => {
	return (
		<>
			{!loaded && (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)}
			{loaded && !user && (
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='username'>Username</label>
						<input type='text' className='form-control'
							id='username'
							name='username'
							onChange={onChange}
							value={form.username} />
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input type='password' className='form-control'
							id='password'
							name='password'
							onChange={onChange}
							value={form.password} />
					</div>
					{error && (
						<div className='alert alert-danger' role='alert'>
							{error}
						</div>
					)}
					<button type='submit' className='btn btn-primary'>Sign in</button>
				</form>
			)}
			{loaded && user && (
				<div>
					<p className='text-center'><img src={'resources/img/boy.png'} className='img-fluid auth-profile' alt='boy' /></p>
					<p className='text-center'>Hello, {user}!</p>
					<div className='alert alert-dark text-break' role='alert'>
						Your Token is a {localStorage.getItem('token')}
					</div>
					<button type='button' className='btn btn-primary' onClick={onLogout}>Sign out</button>
				</div>
			)}
			<hr />
			<footer className='text-right'><i>by roh-j</i></footer>
		</>
	);
}

export default AuthForm;