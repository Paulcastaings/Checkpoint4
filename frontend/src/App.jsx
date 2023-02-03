import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NewPost from "./pages/NewPost";
import MyPosts from "./pages/MyPosts";

import "./style.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/myPosts" element={<MyPosts />} />
      </Routes>
    </div>
  );
}

export default App;
