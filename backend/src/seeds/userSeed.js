import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/Users.js";
import process from "process";
dotenv.config({ path: "../../.env" });

const URL = process.env.MONGODB_URI;

const seedUsers = async () => {
	try {
		await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");

		const users = [
			{
				username: "shubhsinha",
				name: "Shubh Sinha",
				email: "shubh@gmail.com",
				password: await bcrypt.hash("123456", 10),
				firstName: "Shubh",
				lastName: "Sinha",
				about: "Software Engineer",
			},
			{
				username: "steve49",
				name: "Steve Smith",
				email: "smudge@gmail.au",
				password: await bcrypt.hash("123456", 10),
			},
		];

		await User.deleteMany({});
		await User.insertMany(users);

		console.log("Data successfully seeded");
		process.exit(0);
	} catch (error) {
		console.error("Error seeding data:", error);
		process.exit(1);
	}
};

seedUsers();
