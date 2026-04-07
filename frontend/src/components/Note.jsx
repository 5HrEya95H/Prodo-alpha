import { IoMdClose } from "react-icons/io";

const Note = ({ note, handleDragStart, onUpdate }) => {
	return (
		<div
			className='absolute flex h-25 w-75 resize flex-col overflow-auto border border-black bg-yellow-200 p-1 select-none'
			style={{
				position: "absolute",
				left: `${note.position?.x}px`,
				top: `${note.position?.y}px`,
			}}
		>
			<div className='m-1 mb-2 flex flex-row justify-between gap-1'>
				<div
					onMouseDown={(e) => handleDragStart(note, e)}
					style={{ cursor: "move" }}
				>
					📌
				</div>

				<input
					className='w-full border-none bg-transparent text-lg font-bold outline-none'
					placeholder='Title'
					onChange={(e) => onUpdate(note.id, { title: e.target.value })}
				/>

				<button
					type='button'
					className='h-4.5 cursor-pointer items-center text-red-800'
				>
					<IoMdClose size={15} />
				</button>
			</div>

			<textarea
				className='mx-2 h-full resize-none bg-white/40 outline-none'
				onChange={(e) =>
					onUpdate(note.id, {
						text: e.target.value,
					})
				}
			/>
		</div>
	);
};

export default Note;
