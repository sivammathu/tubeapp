import React, { useState } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Seacrh from "./pages/Seacrh";
import Watch from "./pages/Watch";
import { store } from "./store/index";

const App = () => {
	const [darktheme, setDarkTheme] = useState(true);
	const commStore = useSelector((state) => state.common);
	const updateTheme = () => setDarkTheme((p) => !p);
	return (
		<div className='flex w-full h-full flex-col'>
			<BrowserRouter>
				<Navbar darktheme={darktheme} updateTheme={updateTheme} />
				<div className='flex'>
					{commStore.showMenu && (
						<div className='flex-shrink-0 w-[15%]'>
							<Menu darktheme={darktheme} updateTheme={updateTheme} />
						</div>
					)}
					<div className='flex-grow'>
						<Routes>
							<Route path='/'>
								<Route index element={<Home />} />
								<Route path='video'>
									<Route path=':id' element={<Watch />} />
								</Route>
								<Route path='search' element={<Seacrh />} />
								<Route path='login' element={<Login />} />
							</Route>
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
