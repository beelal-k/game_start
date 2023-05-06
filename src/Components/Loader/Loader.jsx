import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
	return (
		<ReactLoading
			type={"spinningBubbles"}
			color={"black"}
			style={{
				position: "absolute",
				left: "0",
				right: "0",
				top: "50%",
				width: "100px",
				height: "100px",
				marginLeft: "auto",
				marginRight: "auto",
				overflow: "hidden",
			}}
		/>
	);
};

export default Loader;
