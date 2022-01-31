import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<div className="antialiased">
			<App />
		</div>
	</React.StrictMode>,
	document.getElementById("root")
);
