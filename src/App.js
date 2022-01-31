import Reminders from "./components/Reminders"

export default function App() {
	return (
		<div className="App">
			<div className="bg-slate-200 w-full h-full flex justify-center items-center">
        <div className="bg-white shadow-md w-[500px] p-8">
          <Reminders />
				</div>
			</div>
		</div>
	)
}
