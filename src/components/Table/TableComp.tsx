import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";
import styles from "./Table.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IData } from "../../API/table";

interface TableCompProps {
	data: IData[];
	editRow: (id: number) => any;
	deleteRow: (id: number) => any;
}

const TableComp = ({ data, editRow, deleteRow }: TableCompProps) => {
	return (
		<TableContainer component={Paper} sx={{ marginTop: "20px" }}>
			<Table sx={{ minWidth: 650 }}>
				<caption
					className={styles.caption}
					style={{ captionSide: "top" }}
				>
					<div className={styles.caption__box}>
						<span>
							Таблица такая-то, вы можете добавить строку
							такую-то...
						</span>
						<AddIcon onClick={() => {}} className={styles.add} />
					</div>
				</caption>
				<TableHead>
					<TableRow>
						<TableCell>companySigDate</TableCell>
						<TableCell>companySignatureName</TableCell>
						<TableCell>documentName</TableCell>
						<TableCell>documentStatus</TableCell>
						<TableCell>documentType</TableCell>
						<TableCell>employeeNumber</TableCell>
						<TableCell>employeeSigDate</TableCell>
						<TableCell>employeeSignatureName</TableCell>
						<TableCell>Edit</TableCell>
						<TableCell>Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow
							key={row.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell component='th' scope='row'>
								{row.companySigDate.toString()}
							</TableCell>
							<TableCell>{row.companySignatureName}</TableCell>
							<TableCell>{row.documentName}</TableCell>
							<TableCell>{row.documentStatus}</TableCell>
							<TableCell>{row.documentType}</TableCell>
							<TableCell>{row.employeeNumber}</TableCell>
							<TableCell>
								{row.employeeSigDate.toString()}
							</TableCell>
							<TableCell>{row.employeeSignatureName}</TableCell>
							<TableCell>
								<EditIcon
									onClick={() => editRow(row.id)}
									className={styles.edit}
								/>
							</TableCell>
							<TableCell>
								<DeleteIcon
									onClick={() => deleteRow(row.id)}
									className={styles.delete}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableComp;
