import axios from "axios";

const getAccessToken = () => {
	return localStorage.getItem("accessToken");
};

const api = axios.create({
	baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
	async (config) => {
		const accessToken = getAccessToken();
		// console.log(accessToken);
		config.headers.Authorization = `Bearer ${accessToken}`;
		// config.headers.accessToken = accessToken;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
