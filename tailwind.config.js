/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			scrollbar: ["rounded"],
		},
	},

	plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
