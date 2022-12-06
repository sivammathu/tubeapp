import { BsYoutube } from "react-icons/bs";

import {
	MdHome,
	MdLightMode,
	MdExplore,
	MdSubscriptions,
	MdVideoLibrary,
	MdOutlineHistory,
	MdMusicVideo,
	MdSports,
	MdGames,
	MdMovie,
	MdPersonPinCircle,
	MdPersonPin,
	MdOutlineBugReport,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchToken } from "../store/toolKit/authSlice";
import { useState } from "react";
import { fetchRandomVideos } from "../store/toolKit/videoSlice";

const Menu = (props) => {
	const glbStore = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const location = useLocation();
	const [smallScr, setSmallScr] = useState(true);

	let className = !props.darktheme
		? "bg-[#202020] text-white"
		: "bg-white text-black";
	return (
		<div className={`h-screen fixed left-0 hover:overflow-hidden ${className}`}>
			<div className='py-2 text-sm w-full items-center z-[100] relative'>
				<div className='flex gap-2'>
					{/* <GiHamburgerMenu
						className='text-2xl flex-shrink-0 ml-8'
						onClick={() => setSmallScr((p) => !p)}
					/> */}
				</div>
				<div>
					<Link to='/' state={{ filter: "All" }}>
						<Item itemName='Home'>
							<MdHome />
						</Item>
					</Link>
					<Link to='/' state={{ sort: "trends" }}>
						<Item itemName='Trends'>
							<MdExplore />
						</Item>
					</Link>
					<Link to='/' state={{ filter: "Approved" }}>
						<Item itemName='Approved'>
							<MdSubscriptions />
						</Item>
					</Link>
					<HR />
					<Link to='/' state={{ filter: "Pending" }}>
						<Item itemName='Pending'>
							<MdVideoLibrary />
						</Item>
					</Link>
					<Link to='/' state={{ filter: "Rejected" }}>
						<Item itemName='Rejected'>
							<MdOutlineHistory />
						</Item>
					</Link>
					<HR />
					{!glbStore.isLoggedIn && (
						<div className='hidden md:block'>
							<SignIn />
							<HR />
						</div>
					)}

					{/* <Item itemName='Music'>
						<MdMusicVideo />
					</Item>
					<Item itemName='Sports'>
						<MdSports />
					</Item>

					<Item itemName='Games'>
						<MdGames />
					</Item>

					<Item itemName='Movie'>
						<MdMovie />
					</Item>
					<Item
						itemName={`${props.darktheme ? "Light" : "Dark"}`}
						onClick={props.updateTheme}
					>
						<MdLightMode />
					</Item> */}
				</div>
			</div>
			<div className='md:hidden z-[90] absolute top-0 left-0 w-screen h-screen bg-[#4d4d4d]'></div>
		</div>
	);
};

const Item = (props) => {
	return (
		<div
			className='flex items-center gap-4 py-2 px-7 hover:bg-[#d6d5d5] cursor-pointer'
			onClick={props.onClick}
		>
			<div className='text-xl'>{props.children}</div>
			<span className='hidden lg:block'>{props.itemName}</span>
		</div>
	);
};

const HR = (props) => {
	return (
		<div className='py-4 px-7'>
			<hr className='border-[#e6e5e5]' />
		</div>
	);
};

const SignIn = (props) => {
	const location = useLocation();
	return (
		<div className='py-2 px-7'>
			<p>Sign in to approve, like and comment. </p>
			<Link to='/login' state={{ redirectPath: location.pathname }}>
				<button
					onClick={props.onClick}
					className='w-24 flex-shrink-0 border border-blue-700 mt-2 py-1 px-4 text-blue-700 font-bold hover:text-white hover:bg-blue-700'
				>
					{/* <MdPersonPin className='text-3xl' /> */}
					SIGN IN
				</button>
			</Link>
		</div>
	);
};

export default Menu;
