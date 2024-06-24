import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";

import { getUserID } from "./hooks/getUserID";

function App() {
  const userID = getUserID();
  
  return (
    <>
    {userID && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </>
  )
}

export default App
