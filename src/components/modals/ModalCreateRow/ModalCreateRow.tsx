import { Button, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import styles from "./ModalCreateRow.module.scss";
import table from "./../../../store/table";

interface ModalCreateRowProps {
	close: () => any;
}

const ModalCreateRow = ({ close }: ModalCreateRowProps) => {
	const [companySignatureName, setCompanySignatureName] = useState("");
	const [documentName, setDocumentName] = useState("");
	const [documentStatus, setDocumentStatus] = useState("");
	const [documentType, setDocumentType] = useState("");
	const [employeeNumber, setEmployeeNumber] = useState("");
	const [employeeSignatureName, setEmployeeSignatureName] = useState("");

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newRow = {
			companySignatureName: companySignatureName,
			documentName: documentName,
			documentStatus: documentStatus,
			documentType: documentType,
			employeeNumber: employeeNumber,
			employeeSignatureName: employeeSignatureName,
		};
		table.create({
			...newRow,
			companySigDate: new Date().toISOString(),
			employeeSigDate: new Date().toISOString(),
		});
		close();
	};

	return (
		<ModalWrapper close={close}>
			<div className={styles.wrapper}>
				<form onSubmit={submitHandler}>
					<div className={styles.header}>
						<h3>Создание записи</h3>
					</div>
					<div className={styles.main}>
						<TextField
							type='text'
							label='companySignatureName'
							value={companySignatureName}
							onChange={(e) =>
								setCompanySignatureName(e.currentTarget.value)
							}
						/>
						<TextField
							type='text'
							label='documentName'
							value={documentName}
							onChange={(e) =>
								setDocumentName(e.currentTarget.value)
							}
						/>
						<TextField
							type='text'
							label='documentStatus'
							value={documentStatus}
							onChange={(e) =>
								setDocumentStatus(e.currentTarget.value)
							}
						/>
						<TextField
							type='text'
							label='documentType'
							value={documentType}
							onChange={(e) =>
								setDocumentType(e.currentTarget.value)
							}
						/>
						<TextField
							type='text'
							label='employeeNumber'
							value={employeeNumber}
							onChange={(e) =>
								setEmployeeNumber(e.currentTarget.value)
							}
						/>
						<TextField
							type='text'
							label='employeeSignatureName'
							value={employeeSignatureName}
							onChange={(e) =>
								setEmployeeSignatureName(e.currentTarget.value)
							}
						/>
					</div>
					<div className={styles.buttons}>
						<Button
							color='success'
							variant='contained'
							type='submit'
						>
							Создать
						</Button>
						<Button
							color='error'
							variant='contained'
							onClick={close}
						>
							Отменить
						</Button>
					</div>
				</form>
			</div>
		</ModalWrapper>
	);
};

export default ModalCreateRow;
