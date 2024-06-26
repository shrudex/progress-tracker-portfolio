import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { getToken } from "../hooks/getToken";
import { useEffect } from "react";
const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = getToken();
		if (token) {
			navigate("/");
		}
	});

	const [passwordFlag, setPasswordFlag] = useState("password");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const login = async () => {
		axios
			.post("/user/login", {
				username: username,
				password: password,
			})
			.then((response) => {
				if (response.data.token) {
					toast.success("Logged In!", {
						className: "f1 shadow-outline",
					});
					toast(`Welcome ${username}!`, {
						position: "bottom-right",
						icon: response.data.emoji,
						className: "f1 shadow-outline",
					});
					window.localStorage.setItem("token", response.data.token);
					window.localStorage.setItem("userID", response.data.userID);
					setTimeout(() => {
						navigate("/");
						window.location.reload();
					}, 1000);
				} else {
					console.log(response.data.message);
					toast(response.data.message, {
						position: "bottom-right",
						icon: response.data.emoji,
						className: "shadow-outline text-black f1",
					});
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error("Error logging in user", {
					position: "bottom-right",
					className: "shadow-outline text-black f1",
				});
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const forgotPassword = async () => {
		if (!username) {
			toast.error("Please enter your username!", {
				position: "bottom-right",
				className: "shadow-outline text-black f1",
			});
			return;
		}
		axios
			.post("/user/forgotPassword", { username })
			.then((response) => {
				if (response.data.color === "green") {
					toast(response.data.message, {
						position: "bottom-right",
						icon: "📧",
						className: "shadow-outline text-black f1",
					});
				} else {
					toast(response.data.message, {
						position: "bottom-right",
						className: "shadow-outline text-black f1",
					});
				}
			})
			.catch((err) => {
				toast.error("Error logging in user", {
					position: "bottom-right",
					className: "shadow-outline text-black f1",
				});
				console.log(err);
			});
	};

	return (
		<>
			<div className="f1 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://logos-world.net/wp-content/uploads/2020/07/Accenture-Logo.png"
						alt="Accenture"
					/>
					<h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Username
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
									placeholder="iamshubhsinha"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8800ff] sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<a
										onClick={(e) => {
											e.preventDefault();
											forgotPassword();
										}}
										className="cursor-pointer font-semibold text-[#a200ff] hover:text-[#8800ff]"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2 relative flex">
								<input
									id="password"
									name="password"
									type={passwordFlag}
									autoComplete="current-password"
									required
									placeholder="********"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full rounded-md border-0 py-1 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8800ff] sm:text-sm sm:leading-6"
								/>
								<button
									onClick={() => {
										setPasswordFlag(
											passwordFlag === "password" ? "text" : "password"
										);
									}}
									type="button"
									className="absolute inset-y-0 right-0 pr-2 flex items-center"
								>
									{passwordFlag === "password" ? <p>👁️</p> : <p>🔑</p>}
								</button>
							</div>
						</div>

						<div>
							<button
								type="submit"
								onClick={() => {
									login();
								}}
								className="flex w-full justify-center rounded-md bg-[#a200ff] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9900ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>

					<p className="mt-6 text-center text-sm text-gray-500">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-semibold leading-6 text-[#a200ff] hover:text-[#8800ff]"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
