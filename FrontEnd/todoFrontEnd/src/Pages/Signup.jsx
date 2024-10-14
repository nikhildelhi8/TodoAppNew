import { Heading } from "../Components/Heading";
import { Button } from "../Components/Button";
import { SubDetail } from "../Components/SubDetail";
import { Input } from "../Components/Input";
import { BottomDetails } from "../Components/BottomDetails";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const setDetails = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/signup", {
        firstName,
        lastName,
        username,
        password,
      });

      toast.success(`User is created : ${response.data.username}`, {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/signin");
      }, 3000);

      // Uncomment to store token after signup
      // localStorage.setItem("token", response.data.token);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
        toast.error(error.response.data.message, {
          position: "top-center",
        });
      } else {
        setMessage("Something went wrong");
        toast.error("Something went wrong ", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }} // Starting state of the animation
      animate={{ opacity: 1, x: 0 }} // State after the animation completes
      exit={{ opacity: 0, x: 0 }} // Animation when leaving the page
      transition={{ duration: 0.5 }} // Transition duration
    >
      <div className="h-screen flex justify-center items-center bg-slate-400">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-100 text-center p-2 h-3/4 px-4">
            <Heading label="Signup" />
            <SubDetail label="Enter Your Information to create an account" />
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              label="First Name"
            />
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              label="Last Name"
            />
            <Input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="johndoe"
              label="Username"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              label="Password"
            />
            <Button label="Signup" onClick={setDetails} />
            {/* {message && <div className="text-red-500 py-1">{message}</div>} */}
            <BottomDetails label="Already a user?" link="Signin" />
          </div>
        </div>
      </div>
      {/* Toast container for popups */}
      <ToastContainer />
    </motion.div>
  );
};
