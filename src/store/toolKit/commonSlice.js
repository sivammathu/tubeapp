import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
	name: "CommonSlice",
	initialState: {
		showMenu: true,
	},
	reducers: {
		taggleMenu: (state, action) => {
			console.log(action.payload);
			if (action.payload !== undefined) {
				state.showMenu = action.payload;
			} else {
				state.showMenu = !state.showMenu;
			}
		},
	},
});

export const { taggleMenu } = commonSlice.actions;

export default commonSlice.reducer;
