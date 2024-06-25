import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	skillId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Skill",
		required: true,
	},
	proficiencyLevel: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const UserSkill = mongoose.model("UserSkill", userSkillSchema);
