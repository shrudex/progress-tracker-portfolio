import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";

const Skills = () => {
	const [buttonIcon, setButtonIcon] = useState("+");
	const userID = localStorage.getItem("userID");
	const [skills, setSkills] = useState([]);
	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const response = await axios.get(`/skills/user-skills/${userID}`);
				setSkills(response.data);
			} catch (error) {
				console.error("Error fetching user skills:", error);
			}
		};

		fetchSkills();
	}, []);

	const buttonClickFunction = async () => {
		if (buttonIcon === "➕") {
			setButtonIcon("❌");
		} else {
			setButtonIcon("➕");
		}
	};
	return (
		<div className="w-full">
			<div className=""></div>
			<button
				onClick={() => buttonClickFunction()}
				className="absolute right-4 bottom-4 text-purple-700  transition-all hover:text-4xl text-3xl "
			>
				{buttonIcon}
			</button>
		</div>
	);
};

export default Skills;
