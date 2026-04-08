import React from 'react'

const CreateColor_Journal = ({handleCreateColour}) => {
  return (
		<div>
			<form
				action='post'
				className='flex flex-col gap-4 text-black w-full lg:w-[30vw] py-10 bg-amber-100 px-2 rounded-xl border-amber-950 border-2'
				onSubmit={(e) => handleCreateColour(e)}
			>
				<h2 className='text-2xl font-bold text-amber-950 text-center'>
					Create Color
				</h2>
				<input
					type='text'
					placeholder='name'
                    name='name'
					className='outline-none text-amber-950 px-3 py-4 capitalize border border-amber-950 rounded-md'
				/>
				<input
					type='text'
					placeholder='enter primary colour'
                    name='color'
					className='outline-none text-amber-950 px-3 py-4 capitalize border border-amber-950 rounded-md'
				/>
				<button
					type='submit'
					className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md'
				>
					Create Journal
				</button>
			</form>
		</div>
  );
}

export default CreateColor_Journal
