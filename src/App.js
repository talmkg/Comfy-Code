import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "./redux/actions";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Identifier from "./views/Identifier";
import Profile from "./views/Profile/Profile";
import Notifications from "./views/Notifications/Notifications";
import Right_Sidebar from "./components/Right_Sidebar/Right_Sidebar";
import Left_Sidebar from "./components/Left_Sidebar/Left_Sidebar";
// import Login from "./views/Login/Login";
// import Profile from "./views/Profile/Profile";
// import Identifier from "./views/Identifier";

function App() {
  return (
    <>
      <Router>
        <div className="d-flex">
          <Left_Sidebar />
          <Routes>
            <Route path="/" element={<Identifier />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
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
