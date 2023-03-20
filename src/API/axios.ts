import axios from "axios";

const instanse = axios.create({
	baseURL: "https://test.v5.pryaniky.com/",
});

instanse.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers["x-auth"] = JSON.parse(localStorage.getItem("token") || "null");
	}
	return config;
});


export default instanse;

export const loginURL = 'ru/data/v3/testmethods/docs/login';
export const getTableURL = 'ru/data/v3/testmethods/docs/userdocs/get'
