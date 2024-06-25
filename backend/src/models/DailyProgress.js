import mongoose from "mongoose";

const dailyProgressSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	task: {
		type: String,
		required: true,
	},
	topicCovered: {
		type: String,
		required: true,
	},
	newSkill: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const DailyProgress = mongoose.model(
	"DailyProgress",
	dailyProgressSchema
);
