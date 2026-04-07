import { useState, useEffect } from "react";

const Journal = () => {
	const time = new Date();
	const dayNumber = time.getDate();
	const dayLabel = time.toLocaleDateString("en-US", { weekday: "long" });

	const [isDragging, setIsDragging] = useState(false);
	const [selected, setSelected] = useState([]);

	const handleMouseDown = (id) => {
		setIsDragging(true);
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	const handleMouseEnter = (id) => {
		if (!isDragging) return;
		setSelected((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		const stopDrag = () => setIsDragging(false);
		window.addEventListener("mouseup", stopDrag);

		return () => window.removeEventListener("mouseup", stopDrag);
	}, []);

	return (
		<>
			<div className='absolute -top-10 left-6 flex flex-col items-center justify-center'>
				<div className='relative top-1 flex h-16.25 w-16.25 items-center justify-center border-[3px] border-amber-900 bg-amber-100 text-[40px]'>
					<span>{dayNumber}</span>
				</div>
				<div className='flex h-7.5 w-35 items-center justify-center border-2 border-amber-900 bg-amber-100 text-sm'>
					<span>{dayLabel}</span>
				</div>
			</div>

			<div className='flex w-1/2 flex-col gap-1 border-2 border-transparent p-2'>
				<div className='m-1 border-b-2 border-black text-center text-base'>
					<p>Daily Journal</p>
				</div>
				<div className='h-12.5 w-full p-1'>
					<div className='text-[10px]'>Choose Category of task...</div>
				</div>
				<div
					className={`w-full overflow-y-auto rounded ${isDragging ? "select-none" : ""}`}
				>
					{Array.from({ length: 24 }, (_, i) => (5 + i) % 24).map(
						(h, i) => {
							const hour12 = h % 12 === 0 ? 12 : h % 12;
							const period = h < 12 ? "AM" : "PM";

							return (
								<div key={i} className='flex'>
									<div className='flex w-10 items-center justify-center border border-black bg-amber-100 text-[10px]'>
										{hour12}
										{period}
									</div>

									<div className='w-5'>
										{[0, 1].map((half) => {
											const id = 2 * i + half;

											return (
												<div
													key={id}
													className={`h-1/2 border-[0.8px] border-black ${selected.includes(id) ? "bg-green-600" : "bg-green-900"}`}
													onMouseDown={() => handleMouseDown(id)}
													onMouseEnter={() => handleMouseEnter(id)}
													onMouseUp={handleMouseUp}
												></div>
											);
										})}
									</div>

									<div className='w-[85%] border border-black bg-amber-100'>
										<textarea className='h-full w-full resize-none bg-transparent px-2 pt-1 text-[10px] outline-none' />
									</div>
								</div>
							);
						},
					)}
				</div>
			</div>

			<div className='w-1/2 border-2 border-transparent p-2'>
				<div className='m-1 border-b-2 border-black text-center text-base'>
					Welcome Shreyansh,
				</div>
				<textarea
					className='h-[90%] w-full resize-none bg-white/20 p-2 font-mono text-sm leading-3 outline-none'
					placeholder='How was your day?...'
				></textarea>
			</div>

			<div className='absolute -bottom-2 -right-2 h-30 w-30 rounded-full border-[6px] border-white bg-red-600'></div>
		</>
	);
};

export default Journal;
