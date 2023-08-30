import axios from "axios";

const baseURL = "http://localhost:3001";
const API = axios.create({baseURL: baseURL});


API.interceptors.request.use((req) => {
	const token = document.cookie.split("; ")
    .find((row) => row.startsWith("access_token="))?.split("=")[1];
	if (token) {
		req.headers.authorization = `Bearer ${token}`;
	}
	return req;

});

export default API;