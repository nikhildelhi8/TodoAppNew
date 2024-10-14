import { Heading } from "../Components/Heading";
import { SubDetail } from "../Components/SubDetail";
import { Input } from "../Components/Input";
import { BottomDetails } from "../Components/BottomDetails";
import { Button } from "../Components/Button";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleInput() {
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      toast.success(`Welcome${response.data.username}`, {
        position: "top-center",
        autoClose: 3000,
      });
      console.log(response);
      // console.log(error.response.data.message);
      // console.log(error.response.data);
      // console.log(error.response.data.message);
      setTimeout(() => {
        navigate("/todo");
      }, 3000);
    } catch (error) {
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
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -0 }} // Starting state of the animation
      animate={{ opacity: 1, x: 0 }} // State after the animation completes
      exit={{ opacity: 0, x: 0 }} // Animation when leaving the page
      transition={{ duration: 0.5 }} // Transition duration
    >
      <div className="h-screen flex justify-center items-center bg-slate-400">
        <div className="flex flex-col justify-center   w-3/4 md:w-2/4">
          <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
            <Heading label="Signin"></Heading>
            <SubDetail label="Enter Your Credentials"></SubDetail>
            <Input
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="john@gmail.com"
              label="Username"
            ></Input>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="****"
              label="Password"
            ></Input>
            <Button label="SignIn" onClick={handleInput}></Button>
            <BottomDetails label="Not Signup ? " link="Signup"></BottomDetails>
          </div>
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};
