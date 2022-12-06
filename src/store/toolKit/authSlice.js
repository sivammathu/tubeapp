import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		token: "",
		userid: "",
		error: false,
		succMsg: "",
		errMsg: "",
		isSignUp: false,
	},
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.token = action.payload.token;
			state.error = false;
			state.errMsg = "";
			state.userid = action.payload.id;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.token = "";
			state.error = false;
			state.errMsg = "";
			state.userid = "";
		},
		error: (state, action) => {
			state.isLoggedIn = false;
			state.token = "";
			state.userid = "";
			state.error = true;
			state.errMsg = action.payload.errorMsg;
			console.log(action.payload.errorMsg);
		},
		signup: (state, action) => {
			state.error = action.payload.error;
			state.errMsg = action.payload.errMsg;
			state.isSignUp = action.payload.isSignUp;
			state.userid = "";
			state.token = "";
		},
		clear: (state, action) => {
			return {
				isLoggedIn: false,
				token: "",
				error: false,
				succMsg: "",
				errMsg: "",
				isSignUp: false,
			};
		},
	},
});

export const { login, logout, error, signup, clear } = authSlice.actions;

export const fetchToken = (uname, pwd) => {
	return async (dispatch) => {
		try {
			let loginResp = await axios.post(
				"http://localhost:5001/api/auth/signin",
				{
					name: uname,
					password: pwd,
				}
			);
			console.log(loginResp.data);
			dispatch(login({ token: loginResp.data.token, id: loginResp.data.id }));
		} catch (err) {
			let errorMsg = "Unknow error, please try later";
			if (err.response.data.message) errorMsg = err.response.data.message;
			dispatch(error({ errorMsg }));
		}
	};
};

export const signUp = (udetails) => async (dispatch) => {
	try {
		let loginResp = await axios.post("http://localhost:5001/api/auth/signup", {
			name: udetails.uname,
			email: udetails.email,
			password: udetails.password,
			img: udetails.img,
		});
		dispatch(signup({ error: false, errMsg: "", isSignUp: true }));
	} catch (err) {
		let errorMsg = "Unknow error, please try later";
		if (err.response.data.message) errorMsg = err.response.data.message;
		dispatch(signup({ error: true, errMsg: errorMsg, isSignUp: false }));
	}
};

export default authSlice.reducer;
