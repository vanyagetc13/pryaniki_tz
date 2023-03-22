import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import table from "./../../../store/table";
import ModalCreateRow from "../../modals/ModalCreateRow/ModalCreateRow";
import ModalEditRow from "../../modals/ModalEditRow/ModalEditRow";
import { CircularProgress } from "@mui/material";
import TableComp from "../../Table/TableComp";
import { IData } from "../../../API/table";
import auth from "../../../store/auth";

const TablePage = observer(() => {
	const [isModalCreateRowOn, setModalCreateRow] = useState(false);
	const [isModalEditRowOn, setModalEditRow] = useState(false);
	const [row, setRow] = useState<IData | null>();
	const navigate = useNavigate();

	const createRowHandler = () => {
		setModalCreateRow(true);
	};
	const editRowHandler = (id: string) => {
		const row = table.data.find((row) => row.id === id);
		if (row) {
			setModalEditRow(true);
			setRow(row);
		} else setRow(null);
	};
	const deleteRowHandler = (id: string) => {
		table.delete(id);
	};

	useEffect(() => {
		if (auth.auth) table.fetchTable();
		else navigate("/login");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='wrapper'>
			{isModalCreateRowOn && (
				<ModalCreateRow close={() => setModalCreateRow(false)} />
			)}
			{isModalEditRowOn && row && (
				<ModalEditRow row={row} close={() => setModalEditRow(false)} />
			)}
			{table.status === "pending" ? (
				<CircularProgress />
			) : (
				<TableComp
					data={table.data.slice()}
					createRow={createRowHandler}
					editRow={editRowHandler}
					deleteRow={deleteRowHandler}
				/>
			)}
		</div>
	);
});

export default TablePage;
