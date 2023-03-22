import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import { Button } from "@mui/material";
import ErrorBundle from "./components/ErrorBundle/ErrorBundle";
import auth from "./store/auth";
import { observer } from "mobx-react-lite";

const App = observer(() => {
	const navigate = useNavigate()
	return (
		<div className='App'>
			<header className='header'>
				<nav className='nav'>
					{auth.auth ? (
						<Button
							onClick={() => {
								auth.logout();
								localStorage.removeItem("token");
								navigate("/login")
							}}
						>
							Выйти
						</Button>
					) : (
						<Button>
							<Link to={"/login"}>login</Link>
						</Button>
					)}
					<Button>
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
