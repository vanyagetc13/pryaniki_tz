import React, { FormEvent, useState, useEffect } from "react";
import Auth from "../../../store/auth";

import styles from "./LoginPage.module.scss";
// import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router";

const LoginPage = observer(() => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	// const navigate = useNavigate();
	const location = useLocation();
	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Auth.authorize(login, password);
		// navigate("/")
	};

	if(Auth.auth) return <Navigate to={"/"} state={{ from: location }} replace />;
	return (
		<div className={styles.wrapper}>
			<form className={styles.form} onSubmit={submitHandler}>
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
		</div>
	);
});

export default LoginPage;
