import React, { useEffect, useLayoutEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { taggleMenu } from "../store/toolKit/commonSlice";

const Hamburger = () => {
	const dispatch = useDispatch();
	const [size, setSize] = useState(0, 0);
	const { showMenu } = useSelector((state) => state.common);
	useLayoutEffect(() => {
		const updateSize = () => {
			setSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => {
			window.removeEventListener("resize", updateSize);
		};
	}, []);

	useEffect(() => {
		if (size[0] <= 767) {
			dispatch(taggleMenu(false));
		} else if (!showMenu) {
			dispatch(taggleMenu(true));
		}
	}, [size]);
	return (
		<div
			className='text-2xl pl-2 cursor-pointer'
			onClick={() => dispatch(taggleMenu())}
		>
			<GiHamburgerMenu className='text-2xl flelx-shrink-0' />
		</div>
	);
};

export default Hamburger;
