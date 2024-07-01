import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	skill: {
		type: String,
		required: true,
	},
	overallRating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	usabilityRating: {
		type: Number,
		min: 1,
		max: 5,
	},
	supportRating: {
		type: Number,
		min: 1,
		max: 5,
	},
	comments: {
		type: String,
		required: true,
	},
	tags: {
		type: String,
	},
	anonymous: {
		type: Boolean,
		default: false,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
