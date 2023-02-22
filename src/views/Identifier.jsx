import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchLoginnedUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Identifier = () => {
  const navigate = useNavigate();
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  useEffect(() => {
    navigate(LoggedInUser?._id ? "/home" : "/login");
  }, []);
  return <></>;
};
export default Identifier;
