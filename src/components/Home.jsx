import React, { useEffect } from "react";
import { getUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const userID = getUserID();
	const navigate = useNavigate();

	useEffect(() => {
		if (!userID) {
			navigate("/login");
		}
	}, [userID, navigate]);

	return <div>Home</div>;
};

export default Home;
