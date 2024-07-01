import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/Users.js";
import { Skill } from "../models/Skills.js";
import { UserSkill } from "../models/UserSkills.js";
import { Feedback } from "../models/Feedbacks.js";

const router = express.Router();
router.use(express.json());
router.post("/submit", async (req, res) => {
	try {
		const {
			skill,
			overallRating,
			usabilityRating,
			supportRating,
			comments,
			tags,
			anonymous,
			userID,
		} = req.body;

		let feedbackData = {
			skill,
			overallRating,
			usabilityRating,
			supportRating,
			comments,
			tags,
			anonymous,
		};

		if (!anonymous) {
			feedbackData.userID = userID;
		}

		const feedback = new Feedback(feedbackData);
		await feedback.save();
		res.status(201).json({ message: "Feedback submitted successfully!" });
	} catch (error) {
		console.error("Error submitting feedback:", error);
		res.status(500).json({ error: "Failed to submit feedback" });
	}
});

export { router as feedbackRouter };
