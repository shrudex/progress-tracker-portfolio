import React from "react";

const SkillsCard = ({ skill }) => {
	return (
		<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{skill.skillName}
			</h5>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
				{skill.description}
			</p>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
				Proficiency Level: {skill.proficiencyLevel}
			</p>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
				Added on: {new Date(skill.createdAt).toLocaleDateString()}
			</p>
		</div>
	);
};

export default SkillsCard;
