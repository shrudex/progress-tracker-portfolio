import React from "react";
import { motion } from "framer-motion";
import axios from "../axios";
import toast from "react-hot-toast";

const SkillsCard = ({ skill, skillAdded, setSkillAdded }) => {
	const deleteSkillFunction = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.delete("/skill/user-skill", {
				data: {
					userId: skill.userId,
					skillId: skill.skillId._id,
				},
			});
			console.log(response.data);
			if (response.color === "red") {
				toast.error("Error deleting the skill!", {
					position: "bottom-right",
					icon: "❌",
					className: "f1 shadow-outline",
				});
			} else {
				toast.success("Skill deleted successfully!", {
					position: "bottom-right",
					icon: "✅",
					className: "f1 shadow-outline",
				});
				setSkillAdded(!skillAdded);
			}
		} catch (error) {
			console.error("Error deleting user skill:", error);
			toast.error("Error deleting user skill", {
				position: "bottom-right",
				icon: "⚠️",
				className: "f1 shadow-outline",
			});
		}
	};
	return (
		<motion.div
			drag
			dragConstraints={{
				top: -50,
				left: -50,
				right: 50,
				bottom: 50,
			}}
			whileHover={{ scale: 1.006, cursor: "grabbing" }}
			className="w-full hover:shadow-xl transition-all pl-5 pr-3 py-3 bg-white border border-gray-200 rounded-lg shadow "
		>
			<h5 className="f1 mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
				{skill.skillId.skillName}
			</h5>
			<p className="f2 mb font-medium text-purple-700 ">
				{skill.skillId.description}
			</p>
			<p className="f2 mb-1 font-normal text-gray-700 ">
				{"⭐".repeat(skill.proficiencyLevel)}
			</p>
			<div className="flex justify-between">
				<p className="f2 font-normal text-gray-700 ">
					<span className="font-bold">Added on:</span>{" "}
					{new Date(skill.createdAt).toLocaleDateString()}
				</p>
				<button onClick={(e) => deleteSkillFunction(e)} className="text-xl">
					🚮
				</button>
			</div>
		</motion.div>
	);
};

export default SkillsCard;
