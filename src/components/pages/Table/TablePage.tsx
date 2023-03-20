import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import table from "./../../../store/table";
import ModalCreateRow from "../../modals/ModalCreateRow/ModalCreateRow";
import ModalEditRow from "../../modals/ModalEditRow/ModalEditRow";
import { CircularProgress } from "@mui/material";
import TableComp from "../../Table/TableComp";
import { IData } from "../../../API/table";

const TablePage = observer(() => {
	const [isModalCreateRowOn, setModalCreateRow] = useState(false);
	const [isModalEditRowOn, setModalEditRow] = useState(false);
	const [row, setRow] = useState<IData | null>();
	const navigate = useNavigate();

	const createRowHandler = () => {};
	const editRowHandler = (id: number) => {
		const row = table.data.find((row) => row.id === id);
		if (row) {
			setModalEditRow(true);
			setRow(row);
		} else setRow(null);
	};
	const deleteRowHandler = (id: number) => {};

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token") || "null");
		if (!token) navigate("/login");
		else {
			table.fetchTable();
		}
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
					data={table.data}
					editRow={editRowHandler}
					deleteRow={deleteRowHandler}
				/>
			)}
		</div>
	);
});

export default TablePage;
