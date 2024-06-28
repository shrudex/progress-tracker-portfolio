import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";
import SkillsCard from "./SkillsCard";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Skills = () => {
	const [buttonIcon, setButtonIcon] = useState("➕");
	const userID = localStorage.getItem("userID");

	// for fetching skills info
	const [skills, setSkills] = useState([]);
	const [userSkills, setUserSkills] = useState([]);
	const [combinedSkills, setCombinedSkills] = useState([]);

	// for modals
	const [open, setOpen] = useState(false);

	// for input fields
	const [skillName, setSkillName] = useState("");
	const [proficiencyLevel, setProficiencyLevel] = useState(1);

	// add skill
	const [skillAdded, setSkillAdded] = useState(false);
	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const response = await axios.get("/skill/all");
				setSkills(response.data.skills);
			} catch (error) {
				console.error("Error fetching user skills:", error);
			}
		};

		const fetchUserSkills = async () => {
			try {
				const response = await axios.get(`/skill/user-skills/${userID}`);
				setUserSkills(response.data.userSkills);
				console.log("User skills", response.data.userSkills);
			} catch (error) {
				console.error("Error fetching user skills:", error);
			}
		};

		fetchSkills();
		fetchUserSkills();
	}, [skillAdded]);

	const buttonClickFunction = () => {
		setButtonIcon(buttonIcon === "➕" ? "❌" : "➕");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("/skill/user-skill", {
				userId: userID,
				skillName,
				proficiencyLevel,
			});

			console.log(response.data);
			if (response.data.color === "red") {
				toast.error(response.data.message, {
					className: "f1 shadow-outline",
				});
			} else {
				toast.success(response.data.message, {
					className: "f1 shadow-outline",
				});
				setSkillAdded(!skillAdded);
				buttonClickFunction();
			}
			buttonClickFunction();
			setOpen(false);
		} catch (error) {
			console.error("Error adding user skill:", error);
		}
	};

	return (
		<div className="w-full px-6 py-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{userSkills.map((skill, index) => (
					<SkillsCard key={index} skill={skill} />
				))}
			</div>

			<div>
				<button
					onClick={() => {
						setOpen(true);
						buttonClickFunction();
					}}
					className="fixed right-4 bottom-4 text-purple-700 transition-all hover:text-4xl text-3xl"
				>
					{buttonIcon}
				</button>

				<Dialog
					className="relative z-10"
					open={open}
					onClose={() => setOpen(false)}
				>
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
					/>

					<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<DialogPanel
								transition
								className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
							>
								<form onSubmit={handleSubmit}>
									<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											
											<div className="mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
												<DialogTitle
													as="h3"
													className="f1 text-center text-lg font-semibold leading-6 text-gray-900"
												>
													Add Skill
												</DialogTitle>
												<div className="mt-2">
													<label
														htmlFor="skillName"
														className="f2 block text-sm font-medium text-gray-700"
													>
														Skill Name
													</label>
													<select
														id="skillName"
														name="skillName"
														value={skillName}
														onChange={(e) => setSkillName(e.target.value)}
														className="f1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
														required
													>
														<option className="f1" value="" disabled>
															Select a skill
														</option>
														{skills.map((skill) => (
															<option className="f1" key={skill._id} value={skill.skillName}>
																{skill.skillName}
															</option>
														))}
													</select>

													<label
														htmlFor="proficiencyLevel"
														className="f2 block text-sm font-medium text-gray-700 mt-4"
													>
														Proficiency Level
													</label>
													<input
														type="number"
														id="proficiencyLevel"
														name="proficiencyLevel"
														value={proficiencyLevel}
														onChange={(e) =>
															setProficiencyLevel(e.target.value)
														}
														min="1"
														max="5"
														className="f1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
														required
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
										<button
											type="submit"
											className="f1 inline-flex w-full justify-center rounded-md bg-purple-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-800 sm:ml-3 sm:w-auto"
										>
											Add Skill
										</button>
										<button
											type="button"
											className="f1 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={() => setOpen(false)}
										>
											Cancel
										</button>
									</div>
								</form>
							</DialogPanel>
						</div>
					</div>
				</Dialog>
			</div>
		</div>
	);
};

export default Skills;
