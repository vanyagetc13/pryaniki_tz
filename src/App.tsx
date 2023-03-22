import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import { Button } from "@mui/material";
import ErrorBundle from "./components/ErrorBundle/ErrorBundle";
import auth from "./store/auth";
import { observer } from "mobx-react-lite";
import errors from "./store/errors";

const App = observer(() => {
	return (
		<div className='App'>
			<header className='header'>
				<nav className='nav'>
					{auth.auth ? (
						<Button
							onClick={() => {
								auth.logout();
								localStorage.removeItem("token");
							}}
						>
							<Link to={"/login"}>Выйти</Link>
						</Button>
					) : (
						<Button>
							<Link to={"/login"}>login</Link>
						</Button>
					)}
					<Button
						onClick={() => {
							if (!auth.auth)
								errors.addError({
									code: 403,
									text: "Вы не авторизованы.",
									id: new Date(),
								});
						}}
					>
						<Link to={"/"}>table</Link>
					</Button>
				</nav>
			</header>
			<Outlet />
			<ErrorBundle />
		</div>
	);
});

export default App;
