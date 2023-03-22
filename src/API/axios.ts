import axios from "axios";

const instanse = axios.create({
	baseURL: "https://test.v5.pryaniky.com/",
});

instanse.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers["x-auth"] = JSON.parse(
			localStorage.getItem("token") || "null"
		);
	}
	return config;
});

export default instanse;

export const loginURL = "ru/data/v3/testmethods/docs/login";
export const getTableURL = "ru/data/v3/testmethods/docs/userdocs/get";
export const createRowURL = "ru/data/v3/testmethods/docs/userdocs/create";
export const deleteRowURL = (id: string) =>
	`ru/data/v3/testmethods/docs/userdocs/delete/${id}`;
export const editRowURL = (id: string) =>
	`ru/data/v3/testmethods/docs/userdocs/set/${id}`;
