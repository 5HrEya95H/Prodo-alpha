import Clock from "./components/Clock";
import Calender from "./components/Calender.jsx";
import Journal from "./components/Journal";
import Inventory from "./components/Inventory";
import ParentForm from "./components/utils/ParentForm.jsx";
import CreateColor_Journal from "./components/forms/CreateColor_Journal.jsx";
import { Route , Routes } from 'react-router-dom'
import Home from "./components/Home.jsx";


const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/temp" element={<Home/>}/>
				<Route path="/" element={<Inventory component={<Journal/>} />} />
				<Route path="/Clock" element = {<Inventory component ={<Clock/>} />}/>
				<Route path="/Calender" element = {<Inventory component = {<Calender/>}/>}/>
			</Routes>
			

		</div>
	);
};

export default App;
