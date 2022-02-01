import { useState, useEffect } from "react";
import Task from "./Task";
import defaultData from "../data/db";
import { Reorder } from "framer-motion";
import { motion } from "framer-motion";

export default function Reminders() {
	const [reminders, setReminders] = useState(localStorage.getItem("reminders") === null ? [] : JSON.parse(localStorage.getItem("reminders")));
	const [showForm, setShowForm] = useState(false);

	function newReminder() {
		console.log("Creating new reminder");
		document.getElementById("input").value = "";
		setShowForm(true);
		setTimeout(() => {
			document.getElementById("input").focus();
		}, 100);
	}

	function addReminder(e) {
		e.preventDefault();
		if (document.getElementById("input").value.length === 0) {
			setShowForm(false);
			return;
		}
		if (reminders.length === 0) {
			setReminders([{ id: 0, task: document.getElementById("input").value }]);
		} else {
			setReminders((prevReminders) => {
				return [
					...prevReminders,
					{
						id: prevReminders[prevReminders.length - 1].id + 1,
						task: document.getElementById("input").value,
					},
				];
			});
		}
		setShowForm(false);
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
			} else if (e.keyCode === 8 && document.activeElement.tagName !== "INPUT") {
				deleteReminder(-1);
			} else if (e.keyCode === 27) {
				setShowForm(false);
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
			<div className="flex items-center justify-between mb-10">
				<h1 className="text-3xl font-bold select-none">Reminders</h1>
				<motion.div
					whileHover={{
						rotate: 15,
					}}
					whileTap={{
						rotate: 90,
					}}
				>
					<button className="" onClick={newReminder}>
						<motion.svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<motion.rect x="3" y="3" width="18" height="18" rx="2" ry="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}></motion.rect>
							<motion.line x1="12" y1="8" x2="12" y2="16" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}></motion.line>
							<motion.line x1="8" y1="12" x2="16" y2="12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}></motion.line>
						</motion.svg>
					</button>
				</motion.div>
			</div>
			{/* List */}
			<ul className="divide-gray-200">
				{reminders.length === 0 && (
					<p className="italic text-center text-gray-500 select-none">
						No reminders! Add your own or{" "}
						<a className="font-semibold cursor-pointer text-violet-600 hover:underline" onClick={() => setReminders(defaultData.reminders)}>
							import defaults
						</a>
					</p>
				)}
				<div className="max-h-[60%] overflow-y-auto overflow-x-clip">
					<Reorder.Group axis="y" onReorder={setReminders} values={reminders}>
						{reminders.map((element) => {
							return (
								<Reorder.Item key={element.id} value={element}>
									<Task element={element} deleteReminder={deleteReminder} />
								</Reorder.Item>
							);
						})}
					</Reorder.Group>
				</div>
				<li className="flex items-center justify-between py-2">
					<form className={`${showForm ? "block" : "hidden"} flex justify-between items-center w-full relative`} onSubmit={addReminder}>
						<input autoComplete="false" autoFocus={true} id="input" className="relative block w-full px-2 py-1 outline-violet-600/60" type="text" placeholder="New reminder..."></input>
						<motion.button
							className="absolute right-2"
							type="submit"
							whileHover={{
								scale: 1.2,
							}}
							whileTap={{
								scale: 1.4,
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</motion.button>
					</form>
				</li>
			</ul>

			{/* Footer */}
			<div className="flex flex-col items-center justify-center mt-10">
				<p>
					Made by{" "}
					<a className="font-semibold text-violet-600 hover:underline" href="https://armeet.com" target="_blank" rel="noreferrer">
						@armeetjatyani
					</a>
				</p>
				<p className="flex flex-col items-center justify-center mt-4 text-gray-600">
					<div>
						<kbd className="px-2 font-mono font-bold bg-gray-300 rounded-md hover:underline hover:cursor-pointer">Tab</kbd> - New Reminder<br></br>
					</div>
					<div>
						<kbd className="px-2 font-mono font-bold bg-gray-300 rounded-md hover:underline hover:cursor-pointer">Backspace</kbd> - Delete Last Reminder<br></br>
					</div>
					<div>
						<kbd className="px-2 font-mono font-bold bg-gray-300 rounded-md hover:underline hover:cursor-pointer">Esc</kbd> - Cancel New Reminder
					</div>
				</p>
			</div>
		</div>
	);
}
