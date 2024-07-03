import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../axios";
import { BeatLoader } from "react-spinners";

const UserProfile = () => {
	const { username } = useParams();
	const [userData, setUserData] = useState({
		username: "",
		name: "",
		email: "",
		firstName: "",
		lastName: "",
		about: "",
		pfpIcon: "",
		_id: "",
	});
	const [userID, setUserID] = useState("");
	const [userSkills, setUserSkills] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await axios.get(`/user/u/${username}`);
				setUserData(response.data);
				setUserID(response.data._id);
				console.log("User data:", response.data);
				setTimeout(() => {
					setLoading(false);
				}, 3000);
			} catch (error) {
				toast.error("Error fetching user data");
				setLoading(false);
			}
		};

		fetchUserData();
	}, [username]);
	useEffect(() => {
		const fetchUserSkills = async () => {
			try {
				const response = await axios.get(`/skill/user-skills/${userID}`);
				setUserSkills(response.data.userSkills);
				console.log("User skills:", response.data.userSkills);
			} catch (error) {
				console.error("Error fetching user skills:", error);
			}
		};
		if (!userID) return;
		fetchUserSkills();
	}, [userID]);

	if (loading) {
		return (
			<div className="flex justify-center items-center mt-52">
				<BeatLoader color={"#a200ff"} loading={loading} size={12} />
			</div>
		);
	}

	return (
		<div>
			<div className="bg-white py-24 sm:py-9">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<img
							className="w-fit h-20 mx-auto rounded-full shadow-2xl mb-3"
							src={
								userData.pfpIcon ||
								"https://avatar.iran.liara.run/public/boy?username=Ash"
							}
							alt="User profile"
						/>
						<h2 className="f2 italic text-base font-semibold leading-7 text-purple-600">
							{userData.about || "hey there, i love coding!"}
						</h2>
						<p className="f1 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							&lt;{userData.username}&gt;
						</p>
						<p className="mt-1 f1 text-lg leading-8 text-gray-600">
							{userData.firstName} | {userData.email} | {userData.lastName}
						</p>
					</div>
				</div>
				<hr className="w-2/4 h-0.5 mx-auto my-4 bg-gray-300 border-0 rounded md:my-6" />
				<div className="w-full px-12">
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left rtl:text-right text-gray-500">
							{" "}
							<caption className="f1 px-5 py-2 text-lg font-semibold text-left rtl:text-right text-white bg-purple-600 ">
								Skills
								<p className="f2 italic text-sm font-normal text-white">
									Checkout the skills of <span c>{userData.username}</span>
								</p>
							</caption>
							<thead className="f2 text-xs text-gray-700 uppercase bg-gray-50 ">
								<tr>
									<th scope="col" className="px-6 py-3">
										Skill Name
									</th>
									<th scope="col" className="px-6 py-3">
										Date
									</th>
									<th scope="col" className="px-6 py-3">
										Rating
									</th>
									<th scope="col" className="px-6 py-3">
										Description
									</th>
								</tr>
							</thead>
							<tbody>
								{userSkills.map((skill) => (
									<tr key={skill._id} className=" border-b ">
										<th
											scope="row"
											className="px-6 py-4 f1 text-purple-600 font-semibold whitespace-nowrap "
										>
											{skill.skillId.skillName}
										</th>
										<td className="f2 italic font-medium px-6 py-4">
											{new Date(skill.createdAt).toLocaleDateString()}
										</td>
										<td className="f2 px-6 py-4">
											{"⭐".repeat(skill.proficiencyLevel)}
										</td>
										<td className="f1 px-6 py-4">
											{skill.skillId.description}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
