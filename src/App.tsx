import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<div className='App'>
			<header className="header">
				<nav className="nav">
					<Link to={"/login"}>login</Link>
					<Link to={"/"}>table</Link>
				</nav>
			</header>
			<Outlet/>
		</div>
	);
}

export default App;
