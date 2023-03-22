import React, { FormEvent, useState, useEffect } from "react";
import Auth from "../../../store/auth";

import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

const LoginPage = observer(() => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();
	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Auth.authorize(login, password);
		if (Auth.auth) navigate("/");
	};
	useEffect(() => {
		if (Auth.auth) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={styles.wrapper}>
			{Auth.auth ? (
				<div style={{ fontSize: "1rem" }}>
					Вы уже вошли! Осуществляется переход на страницу с
					таблицей...
				</div>
			) : (
				<form
					className={styles.form}
					onSubmit={(e) => submitHandler(e)}
				>
					<TextField
						required
						type='text'
						label='login'
						variant='filled'
						value={login}
						onChange={(e) => setLogin(e.currentTarget.value)}
					/>
					<TextField
						required
						type='password'
						label='password'
						variant='filled'
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<Button variant='contained' type='submit'>
						Войти
					</Button>
				</form>
			)}
		</div>
	);
});

export default LoginPage;
