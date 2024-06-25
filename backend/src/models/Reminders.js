import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	reminderText: {
		type: String,
		required: true,
	},
	reminderDate: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const Reminder = mongoose.model("Reminder", reminderSchema);
