import instanse, { loginURL } from "./axios";

export async function auth(username: string, password: string) {
	const response = await instanse.post(loginURL, {
		username: username,
		password: password,
	});
	const error_code = response.data.error_code;
	const error_message = response.data.error_message;
	if (error_code) throw new Error(error_message);
	const token = response.data.data.token
	return token
}