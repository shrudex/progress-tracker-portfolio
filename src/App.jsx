import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import Feedback from "./components/Feedback";
import Profile from "./components/Profile";
import Progress from "./components/Progress";
import Skills from "./components/Skills";

import { Toaster } from "react-hot-toast";
function App() {
	const [renderTodos, setRenderTodos] = useState(false);
	return (
		<div className="min-h-screen">
			<Toaster />
			<Navbar renderTodos={renderTodos} setRenderTodos={setRenderTodos} />
			<Routes>
				<Route
					path="/"
					element={
						<Home renderTodos={renderTodos} setRenderTodos={setRenderTodos} />
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/about" element={<About />} />
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/progress" element={<Progress />} />
				<Route path="/skills" element={<Skills />} />
			</Routes>
		</div>
	);
}

export default App;
