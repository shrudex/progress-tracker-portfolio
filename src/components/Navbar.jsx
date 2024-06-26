import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import { toast } from "react-hot-toast";

const navigation = [
	{ name: "Home", href: "/", current: true },
	{ name: "About", href: "/about", current: false },
	{ name: "Skills", href: "/skills", current: false },
	{ name: "Progress", href: "progress", current: false },
	{ name: "Feedback", href: "/feedback", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [userData, setUserData] = useState({});

	const [showNav, setShowNav] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setShowNav(false);
		}
	}, [navigate, showNav]);

	const userID = localStorage.getItem("userID");

	useEffect(() => {
		axios
			.get(`/user/${userID}`)
			.then((response) => {
				setUserData(response.data);
			})
			.catch((error) => {
				toast.error("There was an error fetching the user data!");
				console.error("There was an error fetching the user data!", error);
			});
	}, [userID]);

	return (
		<>
			{showNav && (
				<Disclosure as="nav" className="f1 bg-[#a200ff]">
					{({ open }) => (
						<>
							<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
								<div className="relative flex h-16 items-center justify-between">
									<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
										{/* Mobile menu button*/}
										<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
											<span className="absolute -inset-0.5" />
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<Bars3Icon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</DisclosureButton>
									</div>
									<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
										<div className="flex flex-shrink-0 items-center">
											<img
												className="h-8 w-auto"
												src="https://symbl-world.akamaized.net/i/webp/29/497cc00219ff4c700e2c95b2a50c88.webp"
												alt="Accenture"
											/>
										</div>
										<div className="hidden sm:ml-6 sm:block">
											<div className="flex space-x-4">
												{navigation.map((item) => (
													<Link
														key={item.name}
														to={item.href}
														className={classNames(
															location.pathname === item.href
																? "bg-purple-700 text-white"
																: "text-white hover:bg-purple-700 hover:text-white",
															"rounded-md px-3 py-2 text-base font-medium"
														)}
														aria-current={
															location.pathname === item.href
																? "page"
																: undefined
														}
													>
														{item.name}
													</Link>
												))}
											</div>
										</div>
									</div>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
										<button
											type="button"
											className="relative rounded-full text-white bg-transparent p-1 focus:outline-none"
										>
											<span className="absolute -inset-1.5" />
											<span className="sr-only">View notifications</span>
											<BellIcon className="h-6 w-6" aria-hidden="true" />
										</button>

										{/* Profile dropdown */}
										<Menu as="div" className="relative ml-3">
											<div>
												<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">Open user menu</span>
													<img
														className="h-8 w-8 rounded-full"
														src={userData.pfpIcon}
														alt=""
													/>
												</MenuButton>
											</div>
											<MenuItems
												transition
												className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
											>
												<MenuItem>
													{({ focus }) => (
														<Link
															to="/profile"
															className={classNames(
																focus ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Edit Profile
														</Link>
													)}
												</MenuItem>

												{/* Future Settings Button 
										<MenuItem>
											{({ focus }) => (
												<a
													href="#"
													className={classNames(
														focus ? "bg-gray-100" : "",
														"block px-4 py-2 text-sm text-gray-700"
													)}
												>
													Settings
												</a>
											)}
										</MenuItem>
                    */}
												<MenuItem>
													{({ focus }) => (
														<a
															onClick={() => {
																localStorage.removeItem("token");
																localStorage.removeItem("userID");
																navigate("/login");
															}}
															className={classNames(
																focus ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm font-semibold[] text-black"
															)}
														>
															Sign out
														</a>
													)}
												</MenuItem>
											</MenuItems>
										</Menu>
									</div>
								</div>
							</div>

							<DisclosurePanel className="sm:hidden">
								<div className="space-y-1 px-2 pb-3 pt-2">
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											className={classNames(
												location.pathname === item.href
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white",
												"block rounded-md px-3 py-2 text-base font-medium"
											)}
											aria-current={
												location.pathname === item.href ? "page" : undefined
											}
										>
											{item.name}
										</Link>
									))}
								</div>
							</DisclosurePanel>
						</>
					)}
				</Disclosure>
			)}
		</>
	);
}
