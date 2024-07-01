import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "../axios";

const Feedback = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [anonymous, setAnonymous] = useState(false);
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const response = await axios.get("/skill/all");
				setSkills(response.data.skills);
				console.log(skills);
			} catch (error) {
				console.error("Error fetching user skills:", error);
			}
		};
		fetchSkills();
	}, []);

	const onSubmit = async (data) => {
		try {
			const userID = localStorage.getItem("userID");
			const feedbackData = {
				...data,
				anonymous,
				userID: anonymous ? null : userID,
			};
			const response = await axios.post("/feedback/submit", feedbackData);
			toast.success("Feedback submitted successfully!", {
				position: "top-center",
				className: "f1 shadow-outline",
			});
			setTimeout(() => {
				window.location.reload();
				window.scrollTo(0, 0);
			}, 1000);
		} catch (error) {
			console.error("Error submitting feedback:", error);
			toast.error("Failed to submit feedback", {
				position: "top-center",
				className: "f1 shadow-outline",
			});
		}
	};

	return (
		<div className="f1 flex min-h-full  flex-1 flex-col justify-center px-6 pb-10  lg:px-2">
			<div className="sm:mx-auto w-full sm:w-full ">
				<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Submit Your Feedback
				</h2>
			</div>

			<div className="mt-5 md:w-4/6 sm:mx-auto sm:w-full">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor="skill"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Select Skill
						</label>
						<div className="">
							<select
								id="skill"
								name="skill"
								{...register("skill", { required: true })}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
							>
								<option value="">Choose any skill</option>
								{skills.map((skill) => (
									<option key={skill.id} value={skill.id}>
										{skill.skillName}
									</option>
								))}
							</select>
							{errors.skill && (
								<span className="text-blue-500 text-sm">
									This field is required
								</span>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-2 justify-between">
						<div>
							<label
								htmlFor="overallRating"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Overall Rating
							</label>
							<div>
								<input
									id="overallRating"
									name="overallRating"
									type="number"
									{...register("overallRating", {
										required: true,
										min: 1,
										max: 5,
									})}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
								/>
								{errors.overallRating && (
									<span className="text-blue-500 text-sm">
										This field is required and must be between 1 and 5
									</span>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="usabilityRating"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Usability Rating
							</label>
							<div>
								<input
									id="usabilityRating"
									name="usabilityRating"
									type="number"
									{...register("usabilityRating", { min: 1, max: 5 })}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
								/>
								{errors.overallRating && (
									<span className="text-blue-500 text-sm">
										This field is required and must be between 1 and 5
									</span>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="supportRating"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Support Rating
							</label>
							<div>
								<input
									id="supportRating"
									name="supportRating"
									type="number"
									{...register("supportRating", { min: 1, max: 5 })}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
								/>
								{errors.overallRating && (
									<span className="text-blue-500 text-sm">
										This field is required and must be between 1 and 5
									</span>
								)}
							</div>
						</div>
					</div>
					<div>
						<label
							htmlFor="comments"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Comments
						</label>
						<div>
							<textarea
								id="comments"
								name="comments"
								{...register("comments", { required: true })}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
							></textarea>
							{errors.comments && (
								<span className="text-blue-500 text-sm">
									This field is required
								</span>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="tags"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Tags
						</label>
						<div className="">
							<input
								id="tags"
								name="tags"
								type="text"
								{...register("tags")}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<label
							htmlFor="anonymous"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Anonymous
						</label>
						<div className="">
							<input
								id="anonymous"
								name="anonymous"
								type="checkbox"
								{...register("anonymous")}
								onChange={() => setAnonymous(!anonymous)}
								className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-transparent focus:ring-0"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Submit Feedback
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Feedback;
