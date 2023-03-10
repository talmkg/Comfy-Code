import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { joinTheGroup } from "../../redux/actions";

function JoinButton(props) {
  const usersGroups = useSelector((state) => state.main.usersGroups);
  const LoggedInUser = useSelector((state) => state?.main.LoggedInUser[0]);
  const [alreadyInGroup, setAlreadyInGroup] = useState(false);

  const dispatch = useDispatch();
  const joinTheTeamAction = () => {
    dispatch(joinTheGroup(props.groupID));
  };
  useEffect(() => {
    if (usersGroups.length > 0) {
      const result = usersGroups?.find(
        (group, i) => group._id === props.groupID
      );
      if (result) {
        setAlreadyInGroup(true);
      }
    }
  }, [usersGroups]);
  if (alreadyInGroup) {
    return (
      <div>
        <Button className="gradient-button">Joined</Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button className="gradient-button" onClick={joinTheTeamAction}>
          Join
        </Button>
      </div>
    );
  }
}

export default JoinButton;
