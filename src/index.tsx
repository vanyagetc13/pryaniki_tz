import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import TablePage from "./components/pages/Table/TablePage";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
	{
		element: <App />,
		path: "/",
		children: [
			{
				path: "/",
				element: <TablePage />,
			},
			{
				element: <LoginPage />,
				path: "/login",
			},
		],
	},
]);

root.render(<RouterProvider router={router} />);
