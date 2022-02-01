import { motion } from "framer-motion";

export default function Task({ element, deleteReminder }) {
	return (
		<motion.div
			key={element.id}
			className="flex items-center justify-between px-2 py-2 rounded-md select-none group"
			initial={{
				x: 20,
				opacity: 0,
			}}
			animate={{
				x: 0,
				opacity: 1,
			}}
		>
			<p className="">{element.task}</p>
			<button className="text-gray-400 opacity-100" onClick={() => deleteReminder(element.id)}>
				<svg className="" xmlns="http://www.w3.org/2000/svg" width={16} h={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</motion.div>
	);
}
