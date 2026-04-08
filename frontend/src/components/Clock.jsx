import { useState, useEffect } from "react";

const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	let hours = time.getHours();
	const midriem = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;
	const minutes = String(time.getMinutes()).padStart(2, "0");
	const seconds = String(time.getSeconds()).padStart(2, "0");

	return (
		<div className='absolute left-6 top-6 z-5 w-75 resize overflow-auto rounded-md border-2 border-stone-800 bg-amber-300 p-4 shadow-[0_8px_16px_rgba(0,0,0,0.35)]'>
			<h1 className='text-3xl font-bold tracking-tight'>
				{hours}:{minutes}:{seconds} {midriem}
			</h1>
		</div>
	);
};

export default Clock;
