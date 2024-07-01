import React, { useState } from "react";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import axios from "../axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const AddTodoModal = ({ isOpen, onClose, renderTodos, setRenderTodos }) => {
	const [task, setTask] = useState("");
	const [dueDate, setDueDate] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const newTask = { task, dueDate };
		handleAddTask(newTask);
		setRenderTodos(!renderTodos);
		setTask("");
		setDueDate("");
		onClose();
	};

	const handleAddTask = async (newTask) => {
		try {
			const response = await axios.post("/todos/add", {
				...newTask,
				userId: localStorage.getItem("userID"),
			});
			setTask([...task, response.data]);
			setTask("");
			setDueDate("");
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	return (
		<Dialog className="relative z-10" open={isOpen} onClose={onClose}>
			<DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />

			<div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
				<div className="f1 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-1/2 h-full">
						<form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md">
							<div className="mb-4">
								<label className="block text-black text-sm font-bold mb-1">
									Title
								</label>
								<input
									type="text"
									placeholder="Task?"
									value={task}
									required
									onChange={(e) => setTask(e.target.value)}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>

							<div className="mb-4">
								<label className="block text-black text-sm font-bold mb-1">
									Due Date
								</label>
								<Datetime
									value={dueDate}
									onChange={(date) => setDueDate(date)}
									inputProps={{
										className:
											"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
										required: true,
									}}
								/>
							</div>
							<button
								type="submit"
								className="mt-64 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Add Task
							</button>
						</form>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default AddTodoModal;
