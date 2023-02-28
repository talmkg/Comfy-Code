import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Identifier from "./views/Identifier";
import Profile from "./views/Profile/Profile";
import Right_Sidebar from "./components/Right_Sidebar/Right_Sidebar";
import Left_Sidebar from "./components/Left_Sidebar/Left_Sidebar";
import { useSelector } from "react-redux";
import loader from "./Files/loader.gif";
function App() {
  const global_loading = useSelector((state) => state?.global_loading);

  return (
    <>
      <Router>
        <div className="d-flex">
          <Left_Sidebar />
          <Routes>
            <Route path="/" element={<Identifier />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
          <Right_Sidebar />
        </div>
      </Router>
    </>
  );
}

export default App;
