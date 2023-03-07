import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MiddleDiv_Profile from "./MiddleDiv_Profile";
import { fetchUserById } from "../../redux/actions";
const Profile = () => {
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  return (
    <>
      <MiddleDiv_Profile />
    </>
  );
};
export default Profile;
