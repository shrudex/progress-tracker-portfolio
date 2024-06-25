import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { usersRouter } from "./routes/users.js";
import { User } from "./models/Users.js";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/user", usersRouter);
const URL = process.env.MONGODB_URI;
mongoose
	.connect(URL, {})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB: ", err);
	});

app.get("/", (req, res) => {
	res.send("Hello Shubh!");
});

app.listen(5000, () => {
	console.log("Server started at http://localhost:5000");
});
