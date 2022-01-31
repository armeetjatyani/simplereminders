import Reminders from "./components/Reminders";

export default function App() {
	return (
		<div className="App">
			<div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
				<div className="bg-white shadow-xl w-[90%] md:w-[500px] p-8 rounded-xl">
				{/* <div className="bg-white shadow-xl w-[500px] min-w-0 p-8 rounded-xl"> */}
					<Reminders />
				</div>
			</div>
		</div>
	);
}
