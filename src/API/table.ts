import instanse, { getTableURL } from "./axios";

export interface IData {
	companySigDate: Date;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: Date;
	employeeSignatureName: string;
	id: number;
}

export type Status = "pending" | "fulfilled"
export async function getAllTable() {
	const response = await instanse.get(getTableURL);
	if(response.data.error_code) throw new Error(response.data.error_message)
	return response.data.data
}
