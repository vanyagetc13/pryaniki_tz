import errors from "../store/errors";
import instanse, { createRowURL, deleteRowURL, getTableURL } from "./axios";

export interface IData {
	companySigDate: string;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: string;
	employeeSignatureName: string;
	id?: string;
}

export type Status = "pending" | "fulfilled";

export async function getAllTable() {
	const response = await instanse.get(getTableURL);
	if (response.data.error_code)
		errors.addError({
			code: response.data.error_code,
			text: response.data.error_text,
			id: new Date(),
		});
	return response.data.data;
}
