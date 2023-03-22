import { makeAutoObservable } from "mobx";
import instanse, { loginURL } from "../API/axios";
import errors from "./errors";

class Auth {
	auth: boolean = false;
	constructor() {
		makeAutoObservable(this);
		this.checkAuth();
	}

	checkAuth() {
		const token = JSON.parse(localStorage.getItem("token") || "null");
		if (token) this.login();
	}

	authorize(username: string, password: string) {
		instanse
			.post(loginURL, {
				username: username,
				password: password,
			})
			.then((response) => response.data)
			.then((data) => {
				const error_code = data.error_code;
				const error_message = data.error_text;
				if (error_code) throw new Error(error_message);
				const token = data.data.token;
				localStorage.setItem("token", JSON.stringify(token));
				this.login();
			})
			.catch((error) => {
				errors.addError(error)
				console.error(error);
			});
	}

	login() {
		this.auth = true;
	}
	logout() {
		this.auth = false;
	}
}

const auth = new Auth();
export default auth;
