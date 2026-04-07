import inventoryBox from "../images/InventoryBox.svg";

const Inventory = ({ component }) => {
	return (
		<div
			className='relative mx-auto mt-20 flex h-127.5 w-222.5 max-w-full justify-around gap-20 bg-cover bg-no-repeat p-11.25 pb-10'
			style={{ backgroundImage: `url(${inventoryBox})` }}
		>
			<button
				type='button'
				className='absolute -top-1 right-4 flex h-6 w-6 items-center justify-center border-2 border-black bg-red-700 text-xs text-white'
			>
				X
			</button>
			{component}
		</div>
	);
};

export default Inventory;
