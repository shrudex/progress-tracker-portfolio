import React from "react";

const TodoItem = ({ task }) => {
	return (
		<div className="flex items-center justify-between p-2 border-b border-gray-200">
			<p className="text-sm">{task.title}</p>
			<span className="text-xs text-gray-400">{task.createdAt}</span>
		</div>
	);
};

export default TodoItem;
