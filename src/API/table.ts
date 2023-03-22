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
	if (response.data.error_code) throw new Error(response.data.error_message);
	return response.data.data;
}
