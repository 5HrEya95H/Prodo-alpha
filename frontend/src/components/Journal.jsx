import { useState, useEffect } from "react";
import ParentForm from "./utils/ParentForm";
import CreateColor_Journal from "./forms/CreateColor_Journal";

const colourCodes = [
	{
		name: "Study",
		color: "blue",
		background_color: "bg-blue-500",
		border: " border border-blue-500",
	},
	{
		name: "code",
		color: "green",
		background_color: "bg-green-500",
		border: " border border-green-500",
	},
	{
		name: "exercise",
		color: "yellow",
		background_color: "bg-yellow-500",
		border: " border border-yellow-500",
	},
	{
		name: "deselect",
		color: "transparent",
		background_color: "bg-transparent",
		border: " border border-white",
	},
	{
		name: "sleep",
		color: "purple",
		background_color: "bg-purple-500",
		border: " border border-purple-500",
	},
];
const Journal = () => {
	const time = new Date();
	const dayNumber = time.getDate();
	const dayLabel = time.toLocaleDateString("en-US", { weekday: "long" });

	const [isDragging, setIsDragging] = useState(false);
	const [colour, setColour] = useState("purple");
	const [selectedColours, setSelectedColours] = useState({});
	const [createColour, setCreateColour] = useState(false);

	const handlePaint = (id) => {
		setSelectedColours((prev) => ({
			...prev,
			[id]: colour,
		}));
	};

	const handleMouseDown = (id) => {
		setIsDragging(true);
		handlePaint(id);
	};

	const handleMouseEnter = (id) => {
		if (!isDragging) return;
		handlePaint(id);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleCreateColour = (e) => {
		e.preventDefault();
		let color = e.target.color.value;
		const newColour = {
			name: e.target.name.value,
			color: color,
			background_color: `bg-${color}-500`,
			border: `border border-${color}-500`,
		};
		colourCodes.push(newColour);
		setCreateColour(false);
	};
	useEffect(() => {
		const stopDrag = () => setIsDragging(false);
		window.addEventListener("mouseup", stopDrag);

		return () => window.removeEventListener("mouseup", stopDrag);
	}, []);

	return (
		<div
			id='journal'
			className='w-full flex justify-between rounded-md border-2 border-stone-800 shadow-[0_8px_16px_rgba(0,0,0,0.35)]'
		>
			<div className='absolute -top-9 left-1/2 -translate-x-[50%] flex flex-col items-center justify-center'>
				<div className='relative top-1 flex h-16.25 w-16.25 items-center justify-center border-[3px] border-amber-900 bg-amber-100 text-[40px]'>
					<span>{dayNumber}</span>
				</div>
				<div className='flex h-7.5 w-35 items-center justify-center border-2 border-amber-900 bg-amber-100 text-sm'>
					<span>{dayLabel}</span>
				</div>
			</div>

			<div className='flex w-[45%] flex-col border-2 border-transparent p-2'>
				<div className='m-1 border-b-2 border-black text-center text-base'>
					<p>Daily Journal</p>
				</div>
				<div className=' w-full p-1'>
					<div className='text-[10px]'>Choose Category of task...</div>
					<ul className='flex gap-1 flex-wrap'>
						{colourCodes.map((item, index) => {
							return (
								<li
									key={index}
									className={`px-2 py-0.5 text-[0.5vw] capitalize rounded-full ${item.border} cursor-pointer whitespace-nowrap ${item.color === colour ? item.background_color : "bg-transparent"}`}
									onClick={() => setColour(item.color)}
								>
									{item.name}
								</li>
							);
						})}
						<li
							className='px-2 py-0.5 text-[0.5vw] capitalize rounded-full ${item.border} cursor-pointer whitespace-nowrap border border-amber-950 text-amber-950'
							onClick={() => setCreateColour(true)}
						>
							{" "}
							+ create
						</li>
					</ul>
				</div>
				<div
					className={`w-full overflow-y-auto rounded ${isDragging ? "select-none" : ""}`}
				>
					{Array.from({ length: 24 }, (_, i) => (5 + i) % 24).map(
						(h, i) => {
							const hour12 = h % 12 === 0 ? 12 : h % 12;
							const period = h < 12 ? "AM" : "PM";

							return (
								<div key={i} className='flex h-6'>
									<div className='flex w-10 items-center justify-center border border-black bg-amber-100 text-[8px]'>
										{hour12}
										{period}
									</div>

									<div className='w-5'>
										{[0, 1].map((half) => {
											const id = 2 * i + half;
											const activeColour = selectedColours[id];
											const activeColourClass =
												colourCodes.find(
													(item) => item.color === activeColour,
												)?.background_color || "";

											return (
												<div
													key={id}
													className={`h-1/2 border-[0.8px] border-black ${activeColourClass}`}
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

			<div className='w-[45%] border-2 border-transparent p-2'>
				<div className='m-1 border-b-2 border-black text-center text-base'>
					Welcome Shreyansh,
				</div>
				<textarea
					className='h-[90%] w-full resize-none bg-white/20 p-2 font-mono text-sm leading-3 outline-none'
					placeholder='How was your day?...'
				></textarea>
			</div>

			<div className='absolute -bottom-2 -right-2 h-30 w-30 rounded-full border-[6px] border-white bg-red-600'></div>
			{createColour && (
				<ParentForm CloseEvent={() => setCreateColour(false)}>
					<CreateColor_Journal handleCreateColour={handleCreateColour} />
				</ParentForm>
			)}
		</div>
	);
};

export default Journal;
