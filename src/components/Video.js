import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Video.css";
import {
	MdDataSaverOn,
	MdOutlineShare,
	MdThumbDown,
	MdThumbDownOffAlt,
	MdThumbUp,
	MdThumbUpOffAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LEDBulp from "../res/Channel.JPG";
import Comments from "./Comments";
import { dislikeVideo, getVideo, likeVideo } from "../store/toolKit/videoSlice";

const Video = (props) => {
	const params = useParams();
	const glbVideo = useSelector((state) => state.video);
	const { userid, token, isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [likes, setLikes] = useState({ cnt: 0, liked: false });
	const [dislike, setDislike] = useState(false);
	const [liked, setLiked] = useState(false);
	const [likeDetails, setLikeDetails] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const ref = useRef(null);
	const onClickOutside = props;

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setLikeDetails(false);
			}
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [onClickOutside]);

	useEffect(() => {
		dispatch(getVideo(params.id));
	}, [params.id]);

	useEffect(() => {
		if (glbVideo.video.get.details.likes) {
			setLikes({ cnt: glbVideo.video.get.details.likes.length, liked: false });
			if (glbVideo.video.get.details.likes.includes(userid)) {
				setLiked(true);
			} else {
				setLiked(false);
			}
		}
		console.log(glbVideo.video.get.details.dislikes);
		if (glbVideo.video.get.details.dislikes) {
			if (glbVideo.video.get.details.dislikes.includes(userid)) {
				setDislike(true);
			} else {
				setDislike(false);
			}
		}
	}, [glbVideo.video.get.details]);

	const handleLikeEvent = () => {
		if (!isLoggedIn)
			return navigate("/login", { state: { redirectPath: location.pathname } });
		dispatch(likeVideo(params.id, token, userid));
	};

	const handleDisLikeEvent = () => {
		if (!isLoggedIn)
			return navigate("/login", { state: { redirectPath: location.pathname } });
		dispatch(dislikeVideo(params.id, token, userid));
	};

	return (
		<div className='container flex justify-between w-full'>
			<div className='content flex-grow p-1 md:p-8'>
				{/* <div className='video rounded-lg w-full h-[400px] bg-gray-300 mb-4'>
					Video!!
				</div> */}
				<h1 className='title text-xl'>{glbVideo.video.get.details.title}</h1>
				{/* <div className='details mt-2 flex justify-between items-center'>
					<div className='info text-xs text-gray-700'>
						{glbVideo.video.get.details.views} views{" "}
						{glbVideo.video.get.details.createdAt}Jun 22, 2022
					</div>
					<div className='buttons flex gap-4 items-center'>
						<div className='flex items-center cursor-pointer' ref={ref}>
							<div onClick={handleLikeEvent}>
								{liked ? (
									<MdThumbUp className='text-xl font-bold text-blue-500' />
								) : (
									<MdThumbUpOffAlt className='text-xl font-bold' />
								)}
							</div>
							<span
								className='ml-1 underline'
								onClick={() => setLikeDetails((p) => !p)}
							>
								{likes.cnt}
							</span>
							{likeDetails && (
								<div className='cust_likes_details'>
									<ul>
										{glbVideo.video.get.details.likes.map((item, index) => {
											return <li key={index}>{item}</li>;
										})}
									</ul>
								</div>
							)}
						</div>
						<div
							className='flex items-center cursor-pointer'
							onClick={handleDisLikeEvent}
						>
							<div>
								{dislike ? (
									<MdThumbDown className='text-xl font-bold text-red-600' />
								) : (
									<MdThumbDownOffAlt className='text-xl font-bold' />
								)}
							</div>
							<span className='ml-1'>Dislike</span>
						</div>
						<div className='flex items-center cursor-pointer'>
							<MdOutlineShare className='text-xl font-bold' />
							Share
						</div>
						<div className='flex items-center cursor-pointer'>
							<MdDataSaverOn className='text-xl font-bold' />
							Save
						</div>
					</div>
				</div> */}
				<hr className='mt-2' />
				<ChannelDetails />
				<hr className='mt-2' />
				<Comments />
			</div>
		</div>
	);
};

const ChannelDetails = () => {
	return (
		<div className='mt-5 flex'>
			<img
				src={LEDBulp}
				className='w-[50px] h-[50px] rounded-full mr-3 flex-shrink-0'
			/>
			<div className='flex justify-between items-start'>
				<div className=''>
					<h1>Channel Name</h1>
					<h2>250 Subscribers</h2>
					<p className='text-xs'>
						Description Notice the use of %PUBLIC_URL% in the tags above. It
						will be replaced with the URL of the `public` folder.
					</p>
				</div>
				<button className='border bg-red-600 px-4 py-1 cursor-pointer text-white rounded-[5px] font-bold hover:text-black'>
					Subscribe
				</button>
			</div>
		</div>
	);
};

const VideoCard = (props) => {
	return (
		<div className='flex mb-2'>
			<div className='video flex-shrink-0 mr-1 w-[150px] h-[100px] bg-gray-300 mb-4'>
				Video
			</div>
			<div className=' flex flex-row flex-wrap w-full'>
				<h1 className='title text-md font-bold'>Title</h1>
				<div className='details items-center'>
					<div className='text-xs my-1 text-gray-600 break-all'>Sivam</div>
					<div className='info text-xs text-gray-700'>
						7,948,154 views Jun 22, 2022
					</div>
				</div>
			</div>
		</div>
	);
};

export default Video;
