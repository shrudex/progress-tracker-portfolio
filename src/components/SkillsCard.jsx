import React from "react";

const SkillsCard = ({ skill }) => {
	return (
		<div className="w-full hover:shadow-xl transition-all pl-5 pr-3 py-3 bg-white border border-gray-200 rounded-lg shadow ">
			<h5 className="f1 mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
				{skill.skillId.skillName}
			</h5>
			<p className="f2 mb font-medium text-purple-700 ">
				{skill.skillId.description}
			</p>
			<p className="f2 mb-1 font-normal text-gray-700 ">
				{"⭐".repeat(skill.proficiencyLevel)}
			</p>

			<p className="f2 font-normal text-gray-700 ">
				<span className="font-bold">Added on:</span> {new Date(skill.createdAt).toLocaleDateString()}
			</p>
		</div>
	);
};

export default SkillsCard;
