import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/Users.js";

const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
	const { username, name, email, password } = req.body;
    console.log(req.body);
    
    const userWithEmail = await User.findOne({ email: email });
	if (userWithEmail) {
		return res.json({ message: "⚠️ User already exists!", color: "red" });
    }

    const userWithUsername = await User.findOnce({ username: username });
    if (userWithUsername) {
        return res.json({ message: "⚠️ Username already exists!", color: "red" });
    }
    
	const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        name,
		email,
		password: hashedPassword,
	});
	await newUser.save();
	const token = jsonwebtoken.sign({ id: newUser._id }, "secret");
	res.json({ message: "✅ User registered successfully!", color: "green", token: token, userID: newUser._id});
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	console.log(req.body);
	const user = await User.findOne({ username: username });
	if (!user) {
		return res.json({ message: "👤 User does not exist!" });
	}
	const valid = await bcrypt.compare(password, user.password);
	console.log(user);
	if (!valid) {
		return res.json({ message: "⚠️ Invalid credentials!" });
	}
	const token = jsonwebtoken.sign({ id: user._id }, "secret");
	res.json({ token, userID: user._id });
});


//router.post("/getUser", async (req, res) => {
//	const { userID } = req.body;
//	const user = await User.findById(userID);
//	res.json(user);
//});

export { router as usersRouter };
