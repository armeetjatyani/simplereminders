export default function Task({ element, deleteReminder}) {
	return (
		<li key={element.id} className="flex justify-between items-center py-2 group hover:bg-gray-100 px-2 rounded-md">
			<p className="">{element.task}</p>
			<button className="text-gray-400 opacity-0 group-hover:opacity-100" onClick={() => deleteReminder(element.id)}>
				<svg className="" xmlns="http://www.w3.org/2000/svg" width={16} h={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</li>
	);
}
