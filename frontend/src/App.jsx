import Clock from "./components/Clock";
import Journal from "./components/Journal";
import Inventory from "./components/Inventory";
import ParentForm from "./components/utils/ParentForm.jsx";
import CreateColor_Journal from "./components/forms/CreateColor_Journal.jsx";

const App = () => {
	return (
		<div className='relative min-h-screen min-w-150 overflow-auto bg-[radial-gradient(circle_at_top,#1d4ed8_0%,#0f172a_62%)] text-stone-900'>
			<Clock />
			<Inventory component={<Journal />} />
			
		</div>
	);
};

export default App;
