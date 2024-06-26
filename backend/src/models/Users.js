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
		default: "",
	},
	lastName: {
		type: String,
		required: false,
		default: "",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	about: {
		type: String,
		required: false,
		default: "",
	},
	pfpIcon: {
		type: String,
		required: false,
		enum: {
			values: [
				"https://avatar.iran.liara.run/public/boy?username=Ash",
				"https://avatar.iran.liara.run/public/15",
				"https://avatar.iran.liara.run/public/92",
				"https://avatar.iran.liara.run/public/48",
				"https://avatar.iran.liara.run/public/18",
				"https://avatar.iran.liara.run/public/64",
				"https://avatar.iran.liara.run/public/100",
				"https://avatar.iran.liara.run/public/85",
			],
		},
		default: "https://avatar.iran.liara.run/public/boy?username=Ash",
	},
});

export const User = mongoose.model("User", userSchema);
