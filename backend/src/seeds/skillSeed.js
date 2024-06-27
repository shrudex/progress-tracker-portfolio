import mongoose from "mongoose";
import dotenv from "dotenv";
import { Skill } from "../models/Skills.js";
import process from "process";
dotenv.config({ path: "../../.env" });

const URL = process.env.MONGODB_URI;

const seedSkills = async () => {
	try {
		await mongoose.connect(URL);
		console.log("Connected to MongoDB");

		const skillsData = [
			{
				skillName: "JavaScript",
				description:
					"A versatile programming language primarily used in web development.",
			},
			{
				skillName: "Python",
				description:
					"A high-level programming language known for its readability and vast library support.",
			},
			{
				skillName: "Java",
				description:
					"A popular programming language used for building server-side applications and Android apps.",
			},
			{
				skillName: "HTML",
				description:
					"The standard markup language used for creating web pages.",
			},
			{
				skillName: "CSS",
				description:
					"A stylesheet language used for describing the presentation of a document written in HTML or XML.",
			},
			{
				skillName: "React",
				description: "A JavaScript library for building user interfaces.",
			},
			{
				skillName: "Node.js",
				description:
					"A JavaScript runtime built on Chrome's V8 JavaScript engine, used for building server-side applications.",
			},
			{
				skillName: "Express.js",
				description:
					"A web application framework for Node.js, designed for building web applications and APIs.",
			},
			{
				skillName: "MongoDB",
				description:
					"A NoSQL database program that uses JSON-like documents with optional schemas.",
			},
			{
				skillName: "SQL",
				description:
					"A domain-specific language used in programming and designed for managing data held in a relational database management system.",
			},
			{
				skillName: "TypeScript",
				description:
					"A typed superset of JavaScript that compiles to plain JavaScript.",
			},
			{
				skillName: "Git",
				description:
					"A distributed version-control system for tracking changes in source code during software development.",
			},
			{
				skillName: "GitHub",
				description:
					"A platform for version control and collaboration, allowing multiple people to work on projects simultaneously.",
			},
			{
				skillName: "Docker",
				description:
					"A set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers.",
			},
			{
				skillName: "Kubernetes",
				description:
					"An open-source container-orchestration system for automating computer application deployment, scaling, and management.",
			},
			{
				skillName: "AWS",
				description:
					"Amazon Web Services, a subsidiary of Amazon providing on-demand cloud computing platforms and APIs.",
			},
			{
				skillName: "Azure",
				description:
					"Microsoft's cloud computing service for building, testing, deploying, and managing applications and services.",
			},
			{
				skillName: "GraphQL",
				description:
					"A data query language for APIs and a runtime for executing those queries by using a type system you define for your data.",
			},
			{
				skillName: "RESTful APIs",
				description:
					"An architectural style for designing networked applications using HTTP requests.",
			},
			{
				skillName: "Angular",
				description:
					"A platform for building mobile and desktop web applications using TypeScript and JavaScript.",
			},
			{
				skillName: "Vue.js",
				description: "A progressive framework for building user interfaces.",
			},
			{
				skillName: "Bootstrap",
				description:
					"A free and open-source CSS framework directed at responsive, mobile-first front-end web development.",
			},
			{
				skillName: "Tailwind CSS",
				description:
					"A utility-first CSS framework for rapidly building custom user interfaces.",
			},
			{
				skillName: "SASS",
				description:
					"A preprocessor scripting language that is interpreted or compiled into CSS.",
			},
			{
				skillName: "Webpack",
				description: "A static module bundler for JavaScript applications.",
			},
			{
				skillName: "Babel",
				description:
					"A JavaScript compiler that allows you to use next-generation JavaScript today.",
			},
			{
				skillName: "Redux",
				description:
					"A predictable state container for JavaScript apps, often used with React.",
			},
			{
				skillName: "Next.js",
				description:
					"A React framework for server-side rendering and generating static websites.",
			},
			{
				skillName: "Django",
				description:
					"A high-level Python web framework that encourages rapid development and clean, pragmatic design.",
			},
			{
				skillName: "Flask",
				description: "A micro web framework written in Python.",
			},
		];

		await Skill.deleteMany({});
		await Skill.insertMany(skillsData);

		console.log("Skills successfully seeded");
		process.exit(0);
	} catch (error) {
		console.error("Error seeding skills data:", error);
		process.exit(1);
	}
};

seedSkills();
