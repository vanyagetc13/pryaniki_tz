import React, { useMemo, useState } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { IData } from "./../../../API/table";
import table from "./../../../store/table";
import styles from "./ModalEditRow.module.scss";
import { Button, TextField } from "@mui/material";

interface ModalEditRowProps {
	row: IData;
	close: () => any;
}

const ModalEditRow = ({ row, close }: ModalEditRowProps) => {
	const [companySignatureName, setCompanySignatureName] = useState(
		row.companySignatureName
	);
	const [documentName, setDocumentName] = useState(row.documentName);
	const [documentStatus, setDocumentStatus] = useState(row.documentStatus);
	const [documentType, setDocumentType] = useState(row.documentType);
	const [employeeNumber, setEmployeeNumber] = useState(row.employeeNumber);
	const [employeeSignatureName, setEmployeeSignatureName] = useState(
		row.employeeSignatureName
	);

	const editHandler = () => {
		const newRow = {
			id: row.id,
			companySignatureName: companySignatureName,
			documentName: documentName,
			documentStatus: documentStatus,
			documentType: documentType,
			employeeNumber: employeeNumber,
			employeeSignatureName: employeeSignatureName,
		};
		table.edit({
			...newRow,
			companySigDate: new Date().toISOString(),
			employeeSigDate: new Date().toISOString(),
		});
		close();
	};

	return (
		<ModalWrapper close={close}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h3>Изменение строки</h3>
				</div>
				<div className={styles.main}>
					<TextField
						type='text'
						value={companySignatureName}
						onChange={(e) =>
							setCompanySignatureName(e.currentTarget.value)
						}
					/>
					<TextField
						type='text'
						value={documentName}
						onChange={(e) => setDocumentName(e.currentTarget.value)}
					/>
					<TextField
						type='text'
						value={documentStatus}
						onChange={(e) =>
							setDocumentStatus(e.currentTarget.value)
						}
					/>
					<TextField
						type='text'
						value={documentType}
						onChange={(e) => setDocumentType(e.currentTarget.value)}
					/>
					<TextField
						type='text'
						value={employeeNumber}
						onChange={(e) =>
							setEmployeeNumber(e.currentTarget.value)
						}
					/>
					<TextField
						type='text'
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
						onClick={() => editHandler()}
					>
						Изменить
					</Button>
					<Button color='error' variant='contained' onClick={close}>
						Отменить
					</Button>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default ModalEditRow;
