import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	progressType: {
		type: String,
		enum: ["Overall", "Daily"],
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const Progress = mongoose.model("Progress", progressSchema);