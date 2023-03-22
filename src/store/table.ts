import { makeAutoObservable, runInAction } from "mobx";
import { getAllTable, IData, Status } from "../API/table";
import instanse, {
	createRowURL,
	deleteRowURL,
	editRowURL,
} from "./../API/axios";
import errors from "./errors";

class Table {
	data: IData[] = [];
	status: Status = "pending";

	constructor() {
		makeAutoObservable(this);
	}

	async fetchTable() {
		const data = await getAllTable();
		setTimeout(() => {
			runInAction(() => {
				this.data = data;
				this.status = "fulfilled";
			});
		}, 1500);
	}

	create(row: IData) {
		const isValid = Object.values(row).every((e) => e !== "");
		if (!isValid)
			return errors.addError({
				code: 1,
				text: "Все поля должны быть заполнены.",
				id: new Date(),
			});
		instanse
			.post(createRowURL, row)
			.then((response) => response.data)
			.then((data) => {
				console.log(data);
				if (data.error_code)
					return errors.addError({
						code: data.error_code,
						text: data.error_text,
						id: new Date(),
					});
				this.data = [...this.data, data.data];
			});
	}

	edit(row: IData) {
		if (!row.id) return;
		instanse
			.post(editRowURL(row.id), row)
			.then((response) => response.data)
			.then((data) => {
				if (data.error_code)
					return errors.addError({
						code: data.error_code,
						text: data.error_text,
						id: new Date(),
					});
				const id = this.data.findIndex((r) => r.id === row.id);
				runInAction(() => {
					this.data[id] = data.data;
				});
			});
	}

	delete(id: string) {
		instanse
			.post(deleteRowURL(id))
			.then((response) => response.data)
			.then((data) => {
				console.log(data);
				if (data.error_code)
					return errors.addError({
						code: data.error_code,
						text: data.error_text,
						id: new Date(),
					});
				runInAction(() => {
					this.data = this.data.filter((row) => row.id !== id);
				});
			});
	}
}

const table = new Table();

export default table;
