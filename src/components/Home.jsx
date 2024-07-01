import React, { useEffect } from "react";
import { getUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useState } from "react";
import TaskList from "./TaskList";

const Home = ({ renderTodos, setRenderTodos }) => {
	const userID = getUserID();
	const navigate = useNavigate();

	useEffect(() => {
		if (!userID) {
			navigate("/login");
		}
	}, [userID, navigate]);

	const [tasks, setTasks] = useState([]);
	const userId = userID;

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await axios.get(`/todos/${userId}`);
				setTasks(response.data);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			}
			
		};

		fetchTasks();
	}, [renderTodos]);

	const handleDeleteTask = async (taskId) => {
		try {
			console.log("Deleting task with id:", taskId);
			await axios.delete(`/todos/${taskId}`);
			setTasks(tasks.filter((task) => task.id !== taskId));
			setRenderTodos(!renderTodos);
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	return (
		<div className="h-fit py-6 px-16">
			<div className="flex flex-col w-full ">
				<TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
			</div>
		</div>
	);
};

export default Home;
