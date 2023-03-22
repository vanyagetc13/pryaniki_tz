import { makeAutoObservable } from "mobx";

class Errors {
	errors: string[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	addError(string: string) {
		this.errors.push(string);
		setTimeout(() => {
			this.errors.shift();
		}, 3000);
	}
}

const errors = new Errors();
export default errors;
