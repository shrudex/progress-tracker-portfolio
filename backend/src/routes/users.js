import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import { sendEmail } from "../utils/mailer.js";

import { User } from "../models/Users.js";

const router = express.Router();
router.use(express.json());

const notAllowedUsernames = [
	"admin",
	"administrator",
	"support",
	"helpdesk",
	"root",
	"sysadmin",
	"superuser",
	"fuck",
	"fucker",
	"nigga",
	"offensiveUser123",
	"inappropriate123",
	"badword",
	"google",
	"facebook",
	"apple",
	"not_allowed",
	"banned_user",
	"offensive_user",
];

function isValidUsername(username) {
	const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
	return (
		usernameRegex.test(username) &&
		!notAllowedUsernames.includes(username.toLowerCase())
	);
}

function isValidPassword(password) {
	const passwordLength = password.length >= 6;
	const hasUppercase = /[A-Z]/.test(password);
	const hasLowercase = /[a-z]/.test(password);
	const hasNumber = /[0-9]/.test(password);
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
	return (
		passwordLength &&
		hasUppercase &&
		hasLowercase &&
		hasNumber &&
		hasSpecialChar
	);
}

function isValidName(name) {
	const nameRegex = /^[a-zA-Z\s]{1,50}$/;
	return nameRegex.test(name);
}

router.post("/register", async (req, res) => {
	const { username, name, email, password } = req.body;

	if (!isValidUsername(username)) {
		return res.json({
			smallFont: true,
			message:
				"⚠️ Invalid username! It should be 3-20 characters long and can only contain letters, numbers, and underscores.",
			color: "red",
		});
	}

	const userWithEmail = await User.findOne({ email: email });
	if (userWithEmail) {
		return res.json({ message: "⚠️ User already exists!", color: "red" });
	}

	const userWithUsername = await User.findOne({ username: username });
	if (userWithUsername) {
		return res.json({ message: "⚠️ Username already exists!", color: "red" });
	}

	if (!isValidPassword(password)) {
		return res.json({
			smallFont: true,
			message:
				"⚠️ Password must be at least 6 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character!",
			color: "red",
		});
	}

	if (!isValidName(name)) {
		return res.json({
			smallFont: true,
			message:
				"⚠️ Name must be between 1 and 50 characters long and contain only alphabetic characters and spaces!",
			color: "red",
		});
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

	sendEmail(
		email,
		`Hi ${username}! Kudos on registering!🎉`,
		`
		<html>
		<head>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f2f2f2;
					padding: 20px;
				}
				h1 {
					color: #333333;
				}
				p {
					font-size: 16px;
					line-height: 1.6;
					color: #666666;
				}
				strong {
					color: #007bff;
				}
				.email-container {
					background-color: #ffffff;
					padding: 20px;
					border-radius: 8px;
					box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
				}
			</style>
		</head>
		<body>
			<div class="email-container">
				<h1>A Big W on Registering for the Progress Tracker App, ${name}!</h1>
				<p>Thank you for registering. Your username is <strong>${username}</strong>.</p>
				<p>Best regards,<br>Shubh Sinha</p>
			</div>
		</body>
		</html>
		`
	);

	res.json({
		message: "✅ User registered successfully!",
		color: "green",
		token: token,
		userID: newUser._id,
	});
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username: username });
	if (!user) {
		return res.json({ message: "👤 User does not exist!" });
	}
	const valid = await bcrypt.compare(password, user.password);
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

const generateTemporaryPassword = () => {
	const temporaryPassword = Math.random().toString(36).slice(-8);
	return temporaryPassword;
};

router.post("/forgotPassword", async (req, res) => {
	const { username } = req.body;
	const user = await User.findOne({ username });
	if (!user) {
		return res.json({
			message: "⚠️ No account found with that username!",
			color: "red",
		});
	}
	const temporaryPassword = generateTemporaryPassword();

	const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);

	user.password = hashedTemporaryPassword;
	await user.save();

	sendEmail(
		user.email,
		`Password Recovery for ${user.name}`,
		`
		<html>
		<head>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f2f2f2;
					padding: 20px;
				}
				h1 {
					color: #333333;
				}
				p {
					font-size: 16px;
					line-height: 1.6;
					color: #666666;
				}
				strong {
					color: #007bff;
				}
				em {
					font-style: italic;
				}
				.email-container {
					background-color: #ffffff;
					padding: 20px;
					border-radius: 8px;
					box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
				}
			</style>
		</head>
		<body>
			<div class="email-container">
				<h1>Password Recovery</h1>
				<p>Hi <em>${user.name}</em>,</p>
				<p>We received a request to recover your password. Your temporary password is:</p>
				<p><strong>${temporaryPassword}</strong></p>
				<p>Best regards,<br>Shubh Sinha</p>
			</div>
		</body>
		</html>
		`
	);

	const maskedEmail = user.email.replace(/(?<=.{3}).(?=[^@]*?@)/g, "*");

	res.json({
		message: `Temporary password sent to ${maskedEmail}!`,
		color: "green",
	});
});

export { router as usersRouter };
