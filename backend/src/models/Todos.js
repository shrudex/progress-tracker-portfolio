import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	task: {
		type: String,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export const Todo = mongoose.model("Todo", todoSchema);
