import { makeAutoObservable, runInAction } from "mobx";
import instanse from "../API/axios";
import { getAllTable, IData, Status } from "../API/table";

class Table {
	data: IData[] = [];
	status: Status = "pending";

	constructor() {
		makeAutoObservable(this);
	}

	async fetchTable() {
		const data = await getAllTable();
		runInAction(() => {
			setTimeout(() => {
				this.data = data;
				this.status = "fulfilled";
			}, 1500);
		});
	}

	async edit () {
		// затычка
	}
}

const table = new Table();

export default table;
