import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	about: {
		type: String,
		required: false,
	},
});

export const User = mongoose.model("User", userSchema);
