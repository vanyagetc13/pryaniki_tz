import { action, makeAutoObservable } from "mobx";
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
		if (token) this.auth = true;
	}

	authorize(username: string, password: string) {
		instanse
			.post(loginURL, {
				username: username,
				password: password,
			})
			.then(
				action("success", (response) => {
					const { data, error_code, error_text } = response.data;
					if (error_code) {
						errors.addError({code: error_code, text: error_text, id: new Date()});
						return;
					}
					const token = data.token;
					localStorage.setItem("token", JSON.stringify(token));
					this.auth = true;
				})
			);
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
