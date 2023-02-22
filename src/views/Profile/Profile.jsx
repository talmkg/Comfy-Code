import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Left_Sidebar from "../../components/Left_Sidebar/Left_Sidebar";
import Right_Sidebar from "../../components/Right_Sidebar/Right_Sidebar";
import MiddleDiv_Profile from "./MiddleDiv_Profile";
import { fetchUserById } from "../../redux/actions";
const Profile = () => {
  const params = useParams();
  const userId = params.userId;
  console.log(userId); // works
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserById(userId, setUser));
  }, []);
  //retrieve single profile info

  if (userId) {
    console.log("other user is loading....");
    return (
      <>
        <MiddleDiv_Profile {...user} />
      </>
    );
  } else {
    console.log("main user is loading....");

    return (
      <>
        <MiddleDiv_Profile {...LoggedInUser} />
      </>
    );
  }
};
export default Profile;
