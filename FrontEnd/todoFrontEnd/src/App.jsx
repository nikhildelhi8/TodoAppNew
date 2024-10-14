import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./pages/Signup";
import { Todo } from "./Pages/Todo";
import { TodoAdd } from "./Pages/TodoAdd";
import { AnimatePresence } from "framer-motion";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <AnimatePresence>
        {/* Add AnimatePresence for transitions */}
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/todo" element={<Todo></Todo>}></Route>
            <Route path="/addTodo" element={<TodoAdd></TodoAdd>}></Route>
          </Routes>
        </BrowserRouter>
      </AnimatePresence>
    </>
  );
}

export default App;
