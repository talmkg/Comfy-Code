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
import { useEffect, useState } from "react";
import Settings from "./views/Settings/Settings";
import Notifications from "./views/Notifications/Notifications";
import { Button, Modal } from "react-bootstrap";
import LoaderWindow from "./components/Mini_Components/LoaderWindow";
import { loadAllData } from "./redux/actions/loaderActions";
function App() {
  const LoggedInUser = useSelector((state) => state?.main.LoggedInUser[0]);
  //

  const dispatch = useDispatch();
  useEffect(() => {
    if (LoggedInUser) {
      dispatch(connectToSocketFunction(LoggedInUser));
    }
  }, [LoggedInUser]);

  const loadingResultSelector = useSelector((state) => state?.loader.result);

  const getAllDataFunc = () => {
    dispatch(loadAllData());
  };
  useEffect(() => {
    const pageAccessedByReload =
      (window.performance.navigation &&
        window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType("navigation")
        .map((nav) => nav.type)
        .includes("reload");
    console.log("page reloaded");
    getAllDataFunc();
  }, []);

  // useEffect(() => {
  //   dispatch(loadAllData());
  // }, [check]);
  //if true => 0. state = true 1. show modal 2. if state = true, add overflow-hidden to mega-parent div
  return (
    <>
      <Router>
        <div className="d-flex position-relative">
          <Left_Sidebar />
          <div
            style={{ position: "absolute", height: "100vh", width: "100vw" }}
          >
            {loadingResultSelector ? <></> : <LoaderWindow />}
          </div>
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
