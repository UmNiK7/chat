import axios from "axios";

export const BASE_URL = 'http://localhost:8080';

export const API_LOGIN = '/login';
export const API_REGISTRATION = '/registration';
export const API_GET_CHATS = '/chats';
export const API_GET_CHAT = '/chat';
export const API_POST_MESSAGE = '/message';

export const axiosInstance = axios.create({ baseURL: BASE_URL });
