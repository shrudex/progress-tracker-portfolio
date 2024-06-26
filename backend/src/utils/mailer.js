import nodemailer from "nodemailer";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: "true",
    port: 465,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendEmail = (to, subject, html) => {
	const mailOptions = {
		from: process.env.EMAIL,
		to,
		subject,
		html,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
	});
};

export { sendEmail };
