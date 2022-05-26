import React, { useState } from 'react';

const Login = ({ onSubmitLogin, setIsRegistration }) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button onClick={() => onSubmitLogin({ login, password })}>Send</button>
			<button onClick={() => setIsRegistration(true)}>registration</button>
		</div>
	);
};

export default Login;
