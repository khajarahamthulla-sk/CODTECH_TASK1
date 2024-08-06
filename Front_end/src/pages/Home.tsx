import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        name,
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/chat");
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:4000/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-12   flex-col   flex items-center bg-gray-700 ">

      <div className="container mx-auto ">
        <div className="max-w-sm mx-auto  bg-black rounded-lg shadow-lg p-11 border border-yellow-500">
          <h1 className="text-2xl text-white font-semibold mb-4 text-center ">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
          {isSignUp && (
            <input
              type="text"
              placeholder="User name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 p-1 text-black  rounded focus:outline-none focus:ring-1 focus:ring-blue-700 border border-yellow-500"
            />
          )}
          <input
            type="email"
            placeholder="example@gamil.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-1 text-black  rounded focus:outline-none focus:ring-1 focus:ring-blue-700 border border-yellow-500"
          />
          <input
            type="password"
            placeholder="Password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-1 text-black  rounded focus:outline-none focus:ring-1 focus:ring-blue-700 border border-yellow-500"
          />
          <button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            className="w-full bg-blue-700 text-white font-semibold mt-3 p-1 rounded hover:bg-blue-600 transition duration-200 border border-yellow-500"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full mt-2 p-2  font-semibold text-white hover:underline"
          >
            {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
          </button>
        </div>
      </div>
      <p className="p-1 italic font-semibold text-gray-300">
        Please sign up or sign in to use the Chat application!
      </p>
      <p className="italic font-semibold text-gray-300">
        Kindly provide correct email id
      </p>
      <p className="italic font-semibold text-gray-300">
        {" "}
        Please wait for a moment after pressing Sign-up, as the database needs
        to initialize
      </p>
    </div>
  );
};

export default Home;
