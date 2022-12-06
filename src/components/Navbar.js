import React from "react";
import { BsYoutube } from "react-icons/bs";
import { MdSearch, MdPersonPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../store/toolKit/authSlice";
import Hamburger from "./Hamburger";

const Navbar = () => {
	const auth = useSelector((state) => state.auth);
	const common = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const location = useLocation();
	const signOutHndlr = () => {
		dispatch(logout());
	};
	console.log(common);
	return (
		<div className='flex items-center justify-between pr-5 py-2 bg-white sticky top-0'>
			<div className='md:hidden'>
				<Hamburger />
			</div>
			<Link to='/'>
				<div className='flex items-center gap-2 px-5 cursor-pointer'>
					<div className='text-red-700 text-3xl'>
						<BsYoutube />
					</div>
					<span className='hidden md:block font-bold text-xl'>Mathu</span>
				</div>
			</Link>
			<div className='w-full'>
				<div className='hidden md:flex items-center md:px-3 text-black bg-white justify-between rounded-2xl md:w-[40%] m-auto border border-gray-300'>
					<input
						placeholder='Search'
						className='py-2 border-none outline-none flex-grow hidden md:block'
					/>
					<MdSearch className='text-2xl flex-shrink-0' />
				</div>
			</div>
			{auth.isLoggedIn ? (
				<>
					<button
						onClick={signOutHndlr}
						className='flex items-center gap-2 border border-blue-700 py-1 px-5 text-blue-700 font-bold hover:text-white hover:bg-blue-700'
					>
						<MdPersonPin className='text-xl' />
						SIGN OUT
					</button>
				</>
			) : (
				<Link
					to='/login'
					className='flex-shrink-0 '
					state={{ redirectPath: location.pathname }}
				>
					<button className='flex items-center gap-2 border border-blue-700 py-1 px-5 text-blue-700 font-bold hover:text-white hover:bg-blue-700'>
						<MdPersonPin className='text-xl' />
						SIGN IN
					</button>
				</Link>
			)}
		</div>
	);
};

export default Navbar;
