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

router.get("/all", async (req, res) => {
	try {
		const skills = await Skill.find();
		res.json({ skills: skills, message: "Skills fetched", color: "green" });
	} catch (error) {
		console.error("Error fetching skills:", error);
		res.json({ message: "Error fetching skills", color: "red", error: error });
	}
});

router.post("/user-skill", async (req, res) => {
	try {
		const { userId, skillName, proficiencyLevel } = req.body;

		const skill = await Skill.findOne({ skillName });
		if (!skill) {
			return res.json({ message: "Skill not found", color: "red" });
		}

		const userSkill = await UserSkill
			.findOne({ userId, skillId: skill._id })
			.populate("skillId");
		
		if (userSkill) {
			return res.json({ message: "Skill already added", color: "red" });
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
	const { userId } = req.params;
	try {
		const userSkills = await UserSkill.find({ userId }).populate("skillId");
		console.log("sending...", userSkills)
		res.json({ userSkills, message: "User skills fetched", color: "green" });
	} catch (error) {
		res.json({
			message: "Error fetching user skills",
			color: "red",
			error: error,
		});
	}
});

export { router as skillsRouter };
