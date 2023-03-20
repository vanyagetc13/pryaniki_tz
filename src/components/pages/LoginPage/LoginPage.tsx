import React, { FormEvent, useState } from "react";
import { auth } from "../../../API/auth";

import styles from "./LoginPage.module.scss";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";

const LoginPage = () => {
	const [error, setError] = useState<string>("");
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();
	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const token = await auth(login, password).catch((err) => {
			console.log(err);
			setError(err);
		});
		if (token) {
			localStorage.setItem("token", JSON.stringify(token));
			navigate("/");
		}
	};

	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={(e) => submitHandler(e)}>
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
				{error && <label>{error}</label>}
			</form>
		</div>
	);
};

export default LoginPage;
