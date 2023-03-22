import { makeAutoObservable, runInAction } from "mobx";
import { getAllTable, IData, Status } from "../API/table";
import instanse, {
	createRowURL,
	deleteRowURL,
	editRowURL,
} from "./../API/axios";

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
		instanse
			.post(createRowURL, row)
			.then((response) => response.data)
			.then((data) => {
				console.log(data);
				if (data.error_code) throw new Error(data.error_message);
				this.data = [...this.data, data.data];
			})
			.catch((err) => console.error(err));
	}

	edit(row: IData) {
		if (!row.id) return;
		instanse
			.post(editRowURL(row.id), row)
			.then((response) => response.data)
			.then((data) => {
				if (data.error_code) throw new Error(data.error_message);
				const id = this.data.findIndex((r) => r.id === row.id);
				runInAction(() => {
					this.data[id] = data.data;
				});
			})
			.catch((err) => console.error(err));
	}

	delete(id: string) {
		instanse
			.post(deleteRowURL(id))
			.then((response) => response.data)
			.then((data) => {
				if (data.error_code) throw new Error(data.error_message);
				runInAction(() => {
					this.data = this.data.filter((row) => row.id !== id);
				});
			})
			.catch((err) => console.error(err));
	}
}

const table = new Table();

export default table;
