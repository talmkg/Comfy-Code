import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MiddleDiv_Profile from "./MiddleDiv_Profile";
import { fetchUserById } from "../../redux/actions";
const Profile = () => {
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();

  const params = useParams();
  let userId;
  const paramsLength = Object.keys(params).length;

  if (paramsLength !== 0) {
    userId = params.userId;
  }
  useEffect(() => {
    if (userId) {
      console.log(params.userId);
      dispatch(fetchUserById(userId, setUser));
    }
  }, []);

  if (userId) {
    return (
      <>
        <MiddleDiv_Profile {...user} />
      </>
    );
  } else {
    return (
      <>
        <MiddleDiv_Profile {...LoggedInUser} />
      </>
    );
  }
};
export default Profile;
