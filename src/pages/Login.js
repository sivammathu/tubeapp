import React, { useEffect, useState } from "react";
import { MdPersonPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchToken, signUp } from "../store/toolKit/authSlice";
import "./Login.css";

const initialState = {
	uname: "mathu",
	password: "test123",
	email: "",
	img: "",
	isSignUp: false,
};

const Login = () => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [udetails, setUDetails] = useState({ ...initialState });

	const loginHndlr = () => {
		if (udetails.uname !== "" && udetails.password !== "") {
			if (!udetails.isSignUp) {
				dispatch(fetchToken(udetails.uname, udetails.password));
			} else if (udetails.email !== "") {
				dispatch(signUp({ ...udetails }));
			}
		}
	};

	const loginController = () => {
		setUDetails((p) => {
			return { ...initialState, isSignUp: !p.isSignUp };
		});
	};

	const inputHandlr = (e, payload) => {
		setUDetails((p) => {
			return { ...p, ...payload };
		});
	};

	useEffect(() => {
		let redirect = location.state?.redirectPath;
		if (!redirect) redirect = "/";
		if (auth.isLoggedIn) return navigate(redirect);
	}, [auth.isLoggedIn]);

	useEffect(() => {
		if (auth.isSignUp) {
			loginController();
		}
	}, [auth.isSignUp]);

	return (
		<div className='flex items-center justify-center login mr-10'>
			<div className='w-[350px] flex flex-col items-center rounded-md border md:mt-[-50px] md:ml-[-150px] border-gray-400'>
				<div className='w-full bg-[#1919eb] font-bold py-[2px] text-white text-center'>
					{udetails.isSignUp ? "Signup" : "Login"}
				</div>
				<div className='bg-[#F6F8FA] px-10 w-[350px] py-5 flex flex-col items-center'>
					{!udetails.isSignUp && (
						<>
							<input
								placeholder='User name'
								className='my-2 p-1 mt-10 outline-none rounded w-full  border border-gray-500'
								value={udetails.uname}
								onChange={(e) => inputHandlr(e, { uname: e.target.value })}
							/>
							<input
								placeholder='Password'
								type='password'
								className='my-2 p-1 mt-5 outline-none rounded w-full border border-gray-500'
								value={udetails.password}
								onChange={(e) => inputHandlr(e, { password: e.target.value })}
							/>
							{auth.error && (
								<p className='text-left text-red-900 font-bold w-full'>
									Error: {auth.errMsg}
								</p>
							)}
							<button
								className=' w-full text-sm mt-7 border border-blue-600 flex items-center justify-center py-1 gap-3 my-3 hover:bg-blue-700 hover:text-yellow-300 outline-none'
								onClick={loginHndlr}
							>
								<MdPersonPin className='text-xl' />
								SIGN IN
							</button>
							<h2 className=''>
								or{" "}
								<button
									className='text-blue-700 underline'
									onClick={loginController}
								>
									Signup
								</button>{" "}
								to continue videos
							</h2>
						</>
					)}
					{udetails.isSignUp && (
						<>
							<input
								placeholder='User name'
								className='my-2 p-1 mt-10 rounded w-full outline-none  border border-gray-500'
								value={udetails.uname}
								onChange={(e) => inputHandlr(e, { uname: e.target.value })}
							/>
							<input
								placeholder='Password'
								type='password'
								className='my-2 p-1 mt-5 rounded w-full border outline-none border-gray-500'
								value={udetails.password}
								onChange={(e) => inputHandlr(e, { password: e.target.value })}
							/>
							<input
								placeholder='Email'
								type='email'
								className='my-2 p-1 mt-10 rounded w-full outline-none  border border-gray-500'
								value={udetails.email}
								onChange={(e) => inputHandlr(e, { email: e.target.value })}
							/>
							<input
								placeholder='Img'
								className='my-2 p-1 mt-10 rounded w-full outline-none  border border-gray-500'
								value={udetails.img}
								onChange={(e) => inputHandlr(e, { img: e.target.value })}
							/>
							{auth.error && (
								<p className='text-left text-red-900 font-bold w-full'>
									Error: {auth.errMsg}
								</p>
							)}
							<button
								className=' w-full text-sm mt-7 border border-blue-600 flex items-center justify-center py-1 gap-3 my-3 hover:bg-blue-700 hover:text-yellow-300 outline-none'
								onClick={loginHndlr}
							>
								<MdPersonPin className='text-xl' />
								SIGN UP
							</button>
							<h2 className=''>
								existing user, click{" "}
								<button
									className='text-red-700 underline'
									onClick={loginController}
								>
									Login
								</button>{" "}
								to continue videos
							</h2>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
