import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
	const [passwordFlag, setPasswordFlag] = useState("password");
	return (
		<>
			<div className="f1 flex min-h-full flex-1 flex-col justify-center px-6 py-9 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="https://logos-world.net/wp-content/uploads/2020/07/Accenture-Logo.png"
						alt="Accenture"
					/>
					<h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create a new account
					</h2>
				</div>

				<div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-4" action="#" method="POST">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Full Name
							</label>
							<div className="mt-1">
								<input
									id="name"
									name="name"
									type="text"
									required
									className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8800ff] sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8800ff] sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Username
							</label>
							<div className="mt-1">
								<input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
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
							</div>
							<div className="mt-1 relative flex">
								<input
									id="password"
									name="password"
									type={passwordFlag}
									autoComplete="current-password"
									required
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
								className="flex w-full justify-center rounded-md bg-[#a200ff] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9900ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign up
							</button>
						</div>
					</form>

					<p className="mt-2 text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold leading-6 text-[#a200ff] hover:text-[#8800ff]"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Signup;
