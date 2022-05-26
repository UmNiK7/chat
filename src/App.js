import React, {useEffect, useState} from 'react';
import Login from './Login';
import {
	API_GET_CHAT,
	API_GET_CHATS,
	API_LOGIN,
	API_POST_MESSAGE,
	API_REGISTRATION,
	axiosInstance,
} from './constants';
import Registration from "./Registration";

const App = () => {
	const [isLogin, setIsLogin] = useState(false);
	const [isRegistration, setIsRegistration] = useState(false);
	const [activeChat, setActiveChat] = useState(null);
	const [login, setLogin] = useState('');
	const [addNewChat, setAddNewChat] = useState('');
	const [password, setPassword] = useState('');
	const [newMessage, setNewMessage] = useState('');
	const [chats, setChats] = useState([]);
	const [chatData, setChatData] = useState([]);

	const sendRequest = async (url, type, body) => {
		let config = {
			headers: {
				Authorization: `Basic ${btoa(login)}:::${btoa(password)}`,
			}
		}

		return axiosInstance[type](url, body, config);
	}

	const onSubmitLogin = (params) => {
		sendRequest(API_LOGIN, 'post', { login: params.login, password: params.password })
			.then((data) => {
				setIsRegistration(false);
				setIsLogin(true);
				setLogin(data.login);
				setPassword(data.password);
			});
	};

	const onSubmitRegistration = (params) => {
		sendRequest(API_REGISTRATION, 'post', { login: params.login, password: params.password })
			.then((data) => {
				setIsRegistration(false);
				setIsLogin(true);
				setLogin(data.login);
				setPassword(data.password);
			});
	};

	const getAllMyChats = () => {
		sendRequest(API_GET_CHATS, 'get')
			.then((data) => {
				setChats(data);
			});
	};

	useEffect(() => {
		if (isLogin) {
			getAllMyChats();
		}
	}, [isLogin]);

	if (isRegistration) {
		return <Registration onSubmitRegistration={onSubmitRegistration} />
	}
	if (!isLogin) {
		return <Login onSubmitLogin={onSubmitLogin} setIsRegistration={setIsRegistration} />
	}

	const getChat = () => {
		sendRequest(API_GET_CHAT, 'post', { chat: activeChat })
			.then((data) => {
				setChatData(data);
			});
	}

	const sendMessage = () => {
		sendRequest(API_POST_MESSAGE, 'post', { to: activeChat, message: newMessage })
			.then(() => {
				getChat();
			});
	}

	return (
		<div>
			<div style={{ border: '2px solid black' }}>
				<h3>Your Chats:</h3>
				<ul>
					{chats.map((chat) => (
						<li key={chat} onClick={() => setActiveChat(chat)} style={{ cursor: 'pointer' }}>
							{chat}
						</li>
					))}
				</ul>
			</div>
			<div style={{ border: '2px solid black' }}>
				<h3>Add new Chat</h3>
				<input type="text" value={addNewChat} onChange={(e) => setAddNewChat(e.target.value)}/>
				<button onClick={() => setActiveChat(addNewChat)}>Add new Chat</button>
			</div>
			{activeChat ? (
				<div style={{ border: '2px solid black' }}>
					<h3>{activeChat}</h3>
					<ul>
						{chatData.map((item) => (
							<li key={item.id}>
								{`from ${item.from}`}
								<br/>
								{`to ${item.to}`}
								<br/>
								{`message ${item.message}`}
							</li>
						))}
					</ul>

					<textarea onChange={(e) => setNewMessage(e.target.value)}>
						{newMessage}
					</textarea>
					<button onClick={() => sendMessage()}>send</button>
				</div>
			) : null}
		</div>
	);
}

export default App;
