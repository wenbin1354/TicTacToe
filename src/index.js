import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const htmlContainer = document.getElementById("root");
const root = ReactDOM.createRoot(htmlContainer);

root.render(
	<React.StrictMode>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
