import React from "react";

const ParentForm = ({ children , CloseEvent}) => {
	return (
		<div className='h-screen w-screen flex items-center justify-center z-10 fixed top-0 left-0 bg-black/20'>
			<h1
				className='cursor-pointer text-3xl text-amber-950 absolute top-1 left-1 bg-amber-200 px-3 py-1 rounded-md border-2 border-amber-950'
				onClick={() => CloseEvent()}
			>
				{" "}
				Close Form{" "}
			</h1>
			{children}
		</div>
	);
};

export default ParentForm;
