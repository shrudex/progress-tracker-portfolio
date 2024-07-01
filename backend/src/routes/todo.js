import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/Users.js";
import { Skill } from "../models/Skills.js";
import { UserSkill } from "../models/UserSkills.js";
import { Feedback } from "../models/Feedbacks.js";
import { Todo } from "../models/Todos.js";

const router = express.Router();
router.use(express.json());
router.post("/add", async (req, res) => {
	const { task, dueDate, userId } = req.body;
	try {
		const newTodo = new Todo({
			userId,
			task,
			dueDate,
		});
		console.log(newTodo);

		const savedTodo = await newTodo.save();
		res.status(201).json(savedTodo);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/:userId", async (req, res) => {
	const { userId } = req.params;

	try {
		const tasks = await Todo.find({ userId });
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Delete a task
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		await Todo.findByIdAndDelete(id);
		res.status(200).json({ message: "Task deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export { router as todoRouter };
