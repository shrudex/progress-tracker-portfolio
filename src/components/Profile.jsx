import React, { useState, useEffect } from "react";
import axios from "../axios";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
const Profile = () => {
	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(true);
	const [pfpIcons, setPfpIcons] = useState([
		"https://avatar.iran.liara.run/public/boy?username=Ash",
		"https://avatar.iran.liara.run/public/15",
		"https://avatar.iran.liara.run/public/92",
		"https://avatar.iran.liara.run/public/48",
		"https://avatar.iran.liara.run/public/18",
		"https://avatar.iran.liara.run/public/64",
		"https://avatar.iran.liara.run/public/100",
		"https://avatar.iran.liara.run/public/85",
	]);

	const userID = localStorage.getItem("userID");

	useEffect(() => {
		axios
			.get(`/user/${userID}`)
			.then((response) => {
				setTimeout(() => {
					setUserData(response.data);
					setLoading(false);
				}, 2000);
			})
			.catch((error) => {
				toast.error("There was an error fetching the user data!");
				console.error("There was an error fetching the user data!", error);
			});
	}, [userID]);
	

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`/user/${userID}`, userData)
			.then((response) => {
				toast("User data updated successfully!", {
					position: "bottom-right",
					icon: "✅",
					className: "f1 shadow-outline",
				});
				setTimeout(() => {
					window.location.reload();
				}, 1000);

				console.log("User data updated successfully:", response.data);
			})
			.catch((error) => {
				toast.error("There was an error updating the user data!", {
					position: "bottom-right",
					className: "f1 shadow-outline",
				});
				console.error("There was an error updating the user data!", error);
			});
	};

	const handlePfpChange = (url) => {
		setUserData({
			...userData,
			pfpIcon: url,
		});
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center mt-52">
				<BeatLoader color={"#a200ff"} loading={loading} size={12} />
			</div>
		);
	}

	return (
		<div className="p-4 flex items-center flex-col">
			<div className="border border-black rounded-full w-fit">
				<img className="w-24 h-24" src={userData.pfpIcon} alt="" />{" "}
			</div>
			<p className="text-2xl font-semibold f2 mt-1"> {userData.username} </p>
			<form onSubmit={handleSubmit} className="w-full">
				<div className="space-y-12 f1 mx-auto w-3/4">
					<div className="border-b border-gray-900/10 pb-12">
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="firstName"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									First name
								</label>
								<div>
									<input
										type="text"
										name="firstName"
										id="firstName"
										autoComplete="given-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
										value={userData.firstName || ""}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="lastName"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Last name
								</label>
								<div>
									<input
										type="text"
										name="lastName"
										id="lastName"
										autoComplete="family-name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
										value={userData.lastName || ""}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="sm:col-span-full">
								<label
									htmlFor="name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Full Name
								</label>
								<div>
									<input
										id="name"
										name="name"
										type="text"
										autoComplete="name"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
										value={userData.name || ""}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="sm:col-span-full">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
										value={userData.email || ""}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="col-span-full">
								<label
									htmlFor="about"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									About
								</label>
								<div>
									<textarea
										id="about"
										name="about"
										rows={3}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
										value={userData.about || ""}
										onChange={handleChange}
									/>
								</div>
								<p className="mt-1 text-sm leading-6 text-gray-600">
									Write a few sentences about yourself.
								</p>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="photo"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Profile Photo
								</label>
								<div className="flex justify-center items-center gap-x-3">
									{userData.pfpIcon ? (
										<img
											src={userData.pfpIcon}
											alt="Profile"
											className="h-16 w-fit rounded-full"
										/>
									) : (
										<UserCircleIcon
											className="h-16 w-fit text-gray-300"
											aria-hidden="true"
										/>
									)}
								</div>
								<div className="mt-4 justify-center grid grid-cols-4  items-center gap-4">
									{pfpIcons.map((icon, index) => (
										<button
											key={index}
											type="button"
											className="flex items-center justify-center"
											onClick={() => handlePfpChange(icon)}
										>
											<img
												src={icon}
												alt="Profile icon"
												className="h-12 w-fit hover:shadow-2xl	 rounded-full hover:h-20 transition-all duration-300 ease-in-out"
											/>
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 flex items-center justify-end gap-x-6">
						<button
							type="submit"
							className="rounded-md bg-purple-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
						>
							Update Details
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Profile;
