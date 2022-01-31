import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
		<div className="antialiased">
			<App />
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);
