import React, { useState } from 'react';

const Registration = ({ onSubmitRegistration, setIsRegistration }) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div>
			<input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<button onClick={() => onSubmitRegistration({ login, password })}>Send</button>
			<button onClick={() => setIsRegistration(false)}>Back To Login</button>
		</div>
	);
};

export default Registration;
