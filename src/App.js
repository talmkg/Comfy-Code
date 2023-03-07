import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Identifier from "./views/Identifier";
import Profile from "./views/Profile/Profile";
import Right_Sidebar from "./components/Right_Sidebar/Right_Sidebar";
import Left_Sidebar from "./components/Left_Sidebar/Left_Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  CONNECTED_TO_SOCKET,
  connectToSocketFunction,
  GENERAL_CHAT_HISTORY,
  SOCKET,
} from "./redux/actions";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Settings from "./views/Settings/Settings";
import Notifications from "./views/Notifications/Notifications";

function App() {
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (LoggedInUser) {
      dispatch(connectToSocketFunction(LoggedInUser));
    }
  }, [LoggedInUser]);

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
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Right_Sidebar />
        </div>
      </Router>
    </>
  );
}

export default App;
