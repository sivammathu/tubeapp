import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
	const [user, setUser] = useState({ name: "" });
	useEffect(() => {
		const fetchUser = async () => {
			let user = await axios.get(
				`http://localhost:5001/api/users/${props.video.userId}`
			);
			setUser(user.data);
		};
		fetchUser();
	}, [props.video]);
	return (
		<Link to={`/video/${props.video._id}`}>
			<div className='w-full mb-5 cursor-pointer'>
				<img className='w-[100%] h-[202px] bg-[#2b2a2a] rounded-xl' />
				<div className='flex mt-2 gap-2'>
					<div className='rounded-full w-[36px] h-[36px] bg-[#999]'></div>
					<div className='text-xs'>
						<h1 className='text-base'>{props.video.title}</h1>
						<h2 className='text-sm'>{user.name ? user.name : ""}</h2>
						<div>Info!</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
