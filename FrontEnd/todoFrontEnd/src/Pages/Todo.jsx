import { AppBar } from "../Components/AppBar";
import { UserInfo } from "../Components/UserInfo";
import { useState } from "react";
// import jwtDecode from "jwt-decode"; // Try without using 'default'

export const Todo = () => {
  const token = localStorage.getItem("token");

  let decoded; // Declare 'decoded' outside the if block

  // if (token) {
  //   decoded = jwtDecode(token); // Assign the value inside the if block
  //   console.log(decoded); // Log decoded inside the if block
  // }

  return (
    <>
      <div className="h-screen w-screen bg-slate-200">
        {/* app bar */}
        <AppBar></AppBar>
        {/* Use decoded information if available */}
        <UserInfo label={decoded ? decoded.username : "Nikhil"}></UserInfo>
      </div>
    </>
  );
};
