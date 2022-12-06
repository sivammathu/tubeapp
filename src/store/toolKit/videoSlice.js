import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const VideoSlice = createSlice({
	name: "video",
	initialState: {
		loading: false,
		videos: [],
		video: {
			get: {
				loading: false,
				details: {
					title: "",
					views: "",
					createdAt: "",
					likes: [],
					dislikes: [],
				},
				error: {
					status: false,
					message: "",
				},
			},
		},
		filter: "",
	},
	reducers: {
		videosLoading: (state) => {
			state.loading = true;
		},
		readRandomVideos: (state, action) => {
			state.loading = false;
			state.videos = action.payload.data;
			state.filter = action.payload.filter;
		},
		videoLoading: (state) => {
			state.video.get.loading = true;
			state.video.get.details = {
				title: "",
				views: "",
				createdAt: "",
				likes: [],
				dislikes: [],
			};
			state.video.get.error = { status: false, message: "" };
		},
		videoError: (state, action) => {
			state.video.get.loading = false;
			state.video.get.details = {
				title: "",
				views: "",
				createdAt: "",
				likes: [],
				dislikes: [],
			};
			state.video.get.error = { status: true, message: action.payload.message };
		},
		fetchVideo: (state, action) => {
			state.video.get.loading = false;
			state.video.get.details = {
				title: action.payload.title,
				views: action.payload.views,
				createdAt: action.payload.createdAt,
				likes: action.payload.likes,
				dislikes: action.payload.dislikes,
			};
			state.video.get.error = { status: false, message: "" };
		},
		updateLikes: (state, action) => {
			if (action.payload.respData === "Likes removed") {
				state.video.get.details.likes.pop(action.payload.userid);
			} else {
				state.video.get.details.likes.push(action.payload.userid);
			}
		},
		updateDisLikes: (state, action) => {
			if (action.payload.respData === "DisLiked") {
				state.video.get.details.dislikes.push(action.payload.userid);
			} else {
				state.video.get.details.dislikes.pop(action.payload.userid);
			}
		},
		applyFilter: (state, action) => {
			state.filter = action.payload.filter;
		},
	},
});

export const {
	videosLoading,
	readRandomVideos,
	videoLoading,
	videoError,
	fetchVideo,
	updateLikes,
	updateDisLikes,
	applyFilter,
} = VideoSlice.actions;

export const fetchRandomVideos = (filter, url) => {
	return async (dispatch) => {
		dispatch(videosLoading());
		try {
			let servRes = await axios.put(url);
			if (filter === "" || !filter) filter = "All";
			dispatch(readRandomVideos({ data: servRes.data, filter }));
		} catch (err) {
			dispatch(readRandomVideos({ data: [], filter }));
		}
	};
};

export const getVideo = (id) => async (dispatch) => {
	dispatch(videoLoading());
	try {
		let resp = await axios.get(`http://localhost:5001/api/video/${id}`);
		dispatch(fetchVideo(resp.data));
	} catch (err) {
		let message = "Unknown error, please try later";
		if (err.response.data.message) message = err.response.data.message;
		dispatch(videoError({ message }));
	}
};

export const likeVideo = (videoID, token, userid) => async (dispatch) => {
	try {
		let resp = await axios.put(
			`http://localhost:5001/api/video/likes/${videoID}`,
			"",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		let respData = resp.data?.message;
		if (respData) {
			dispatch(updateLikes({ respData, userid }));
		}
	} catch (err) {
		let message = "Unknown error, please try later";
		if (err.response.data.message) message = err.response.data.message;
		dispatch(videoError({ message }));
	}
};

export const dislikeVideo = (videoID, token, userid) => async (dispatch) => {
	try {
		let resp = await axios.put(
			`http://localhost:5001/api/video/dislikes/${videoID}`,
			"",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		let respData = resp.data?.message;
		if (respData) {
			dispatch(updateDisLikes({ respData, userid }));
		}
		console.log(respData);
	} catch (err) {
		let message = "Unknown error, please try later";
		if (err.response.data.message) message = err.response.data.message;
		dispatch(videoError({ message }));
	}
};

export default VideoSlice.reducer;
