import React, { useState } from "react";

const TaskList = ({ tasks, onDeleteTask }) => {
	const handleDelete = (taskId) => {
		onDeleteTask(taskId);
	};

	return (
		<div className="">
			
			{tasks.length ? (
				tasks.map((task) => (
					<div key={task._id} className="f1 bg-white p-4 rounded-lg shadow-xl mb-6">
						<h3 className="text-xl font-bold mb-2">{task.task}</h3>
						<p className="text-gray-700 mb-2">{task.description}</p>
						<p className="text-gray-500">
							Due Date: <span className="f2 font-bold text-black">{new Date(task.dueDate).toLocaleString()}</span>
						</p>
						<p className="text-gray-500">Status: {task.status}</p>
						<button
							onClick={() => handleDelete(task._id)}
							className="mt-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
						>
							Delete
						</button>
					</div>
				))
			) : (
				<p className="f1 text-lg text-center text-gray-700">No tasks found.</p>
			)}
		</div>
	);
};

export default TaskList;
