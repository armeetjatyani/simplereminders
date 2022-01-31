import { useState, useEffect } from "react";
import Task from "./Task";
import defaultData from "../data/db"

export default function Reminders() {
	const [reminders, setReminders] = useState(localStorage.getItem("reminders") === null ? [] : JSON.parse(localStorage.getItem("reminders")));
	const [showForm, setShowForm] = useState(false);

    console.log(reminders)

	function newReminder() {
		console.log("Creating new reminder");
		document.getElementById("input").value = "";
		setShowForm((prev) => !prev);
		setTimeout(() => {
			document.getElementById("input").focus();
		}, 100);
	}

	function addReminder(e) {
		e.preventDefault();
		if (document.getElementById("input").value.length === 0) {
			setShowForm((prev) => !prev);
			return;
		}
		if (reminders.length === 0) {
			setReminders([{ id: 0, task: document.getElementById("input").value }]);
		} else {
			setReminders((prevReminders) => {
				return [...prevReminders, { id: prevReminders[prevReminders.length - 1].id + 1, task: document.getElementById("input").value }];
			});
		}
		setShowForm((prev) => !prev);
	}

	function deleteReminder(i) {
		if (i === -1) {
			console.log("Deleting last reminder");
			setReminders((prevReminders) => {
				const copy = prevReminders.slice();
				copy.pop();
				return copy;
			});
		} else {
			console.log(`Deleting reminder (${i})`);
			setReminders((prevReminders) => {
				return prevReminders.filter((element) => element.id !== i);
			});
		}
	}

	useEffect(() => {
		function handleKeyboard(e) {
			if (e.key === "/" || e.keyCode === 9) {
				newReminder();
			} else if (e.keyCode === 8) {
				deleteReminder(-1);
			}
		}
		document.addEventListener("keydown", handleKeyboard);
		return () => {
			document.removeEventListener(handleKeyboard);
		};
	}, []);

	useEffect(() => {
		localStorage.setItem("reminders", JSON.stringify(reminders));
	}, [reminders]);

	return (
		<div>
			{/* Header */}
			<div className="flex justify-between items-center mb-10">
				<h1 className="font-bold text-3xl select-none">Reminders</h1>
				<button className="" onClick={newReminder}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
						<line x1="12" y1="8" x2="12" y2="16"></line>
						<line x1="8" y1="12" x2="16" y2="12"></line>
					</svg>
				</button>
			</div>
			{/* List */}
			<ul className="divide-y divide-gray-200">
				{reminders.length === 0 && <ul className="text-gray-500 italic select-none">No reminders! Add your own or <a className="font-semibold text-violet-600 cursor-pointer" onClick={() => setReminders(defaultData.reminders)}>import defaults</a></ul>}
				{reminders.map((element) => {
					return <Task key={element.id} element={element} deleteReminder={deleteReminder} />;
				})}
				<li className="flex justify-between items-center py-2">
					<form className={`${showForm ? "block" : "hidden"} flex justify-between items-center w-full relative`} onSubmit={addReminder}>
						<input autoComplete="false" autoFocus={true} id="input" className="relative outline-violet-600/60 px-2 py-1 block w-full" type="text" placeholder="New reminder..."></input>
						<button className="absolute right-2" type="submit">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</button>
					</form>
				</li>
			</ul>

			{/* Footer */}
			<div className="flex items-center justify-center mt-10">
				<p>
					Made by{" "}
					<a className="font-semibold text-violet-600" href="https://armeet.com" target="_blank" rel="noreferrer">
						@armeetjatyani
					</a>
				</p>
			</div>
		</div>
	);
}
