import { login, logout } from "../actions/auth";

const InitialState = {
	isLoggedIn: false,
	token: "",
};

export const authReducers = (state = InitialState, action) => {
	switch (action.type) {
		case login:
			return { isLoggedIn: true };
		case logout:
			return { isLoggedIn: false };
		default:
			return state;
	}
};
