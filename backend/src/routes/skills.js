import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/Users.js";
import { Skill } from "../models/Skills.js";
import { UserSkill } from "../models/UserSkills.js";

const router = express.Router();
router.use(express.json());

router.post("/user-skill", async (req, res) => {
	try {
		const { userId, skillName, proficiencyLevel } = req.body;

		const skill = await Skill.findOne({ skillName });
		if (!skill) {
			return res.json({ message: "Skill not found", color: "red" });
		}

		const newUserSkill = new UserSkill({
			userId,
			skillId: skill._id,
			proficiencyLevel,
		});

		await newUserSkill.save();

		res.json({ message: "User skill added", color: "green" });
	} catch (error) {
		console.error("Error adding user skill:", error);
		res.json({
			message: "Error adding user skill",
			color: "red",
			error: "error",
		});
	}
});

router.get("/user-skills/:userId", async (req, res) => {
	try {
		const { userId } = req.params;

		const userSkills = await UserSkill.find({ userId }).populate("skillId");

		const skills = userSkills.map((userSkill) => ({
			skillName: userSkill.skillId.skillName,
			description: userSkill.skillId.description,
			proficiencyLevel: userSkill.proficiencyLevel,
			createdAt: userSkill.createdAt,
		}));

		res.json({
			skills: skills,
			message: "User skills fetched",
			color: "green",
		});
	} catch (error) {
		console.error("Error fetching user skills:", error);
		res.json({
			message: "Error fetching user skills",
			color: "red",
			error: error,
		});
	}
});

export default router;
