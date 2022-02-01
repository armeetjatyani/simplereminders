import Reminders from "./components/Reminders";
import { motion } from "framer-motion";

export default function App() {
	return (
		<div className="App">
			<div className="flex items-center justify-center w-screen h-screen bg-slate-200">
				<motion.div className="bg-white shadow-xl w-[90%] md:w-[500px] p-8 rounded-xl" layout>
					<Reminders />
				</motion.div>
			</div>
		</div>
	);
}
