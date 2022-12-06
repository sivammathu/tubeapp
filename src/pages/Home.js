import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Content from "../components/Content";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { fetchRandomVideos } from "../store/toolKit/videoSlice";

const Home = (props) => {
	const glbVideos = useSelector((state) => state.video);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		let filter = location?.state?.filter;
		let sort = location?.state?.sort;
		if (!filter) filter = "All";
		let url = "http://localhost:5001/api/video/random";
		if (!sort) url = "http://localhost:5001/api/video/trend";
		dispatch(fetchRandomVideos(filter, url));
	}, [location.state]);

	return (
		<div className='flex flex-wrap pl-5 pr-1 py-5 gap-6 w-[100%]'>
			{glbVideos.videos.map((video, index) => {
				if (video.status === glbVideos.filter || glbVideos.filter === "All") {
					return (
						<div className='w-[95%] sm:w-[45%] md:w-[30%]'>
							<Card key={video["_id"]} video={video} />
						</div>
					);
				}
			})}
		</div>
	);
};

export default Home;
