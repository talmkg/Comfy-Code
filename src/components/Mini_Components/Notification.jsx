import { useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { joinTheGroup } from "../../redux/actions";
import Big_Follow_Button from "./Big_Follow_Button";
import Follow_Button from "./Follow_Button";
import JoinButton from "./JoinButton";

const Notification = (props) => {
  const {
    group,
    bio,
    from,
    type,
    text,
    myGroups,
    groupID,
    currentPage,
    createdAt,
  } = props;
  const dispatch = useDispatch();

  return (
    <Col
      xs={12}
      className={
        currentPage === "notifications"
          ? "mt-1 mb-1 rounded-3 pe-3 px-3 d-flex justify-content-between align-items-start"
          : "mt-1 mb-1 rounded-3 p-1 d-flex justify-content-between align-items-start"
      }
      style={{
        height: "100%",
        backgroundColor: "transparent",
      }}
    >
      <div className="d-flex align-items-start">
        <img
          src={from?.pfp}
          className="me-2"
          style={{
            width: "50px",
            borderRadius: "50%",
          }}
        />{" "}
        <div>
          <div className="text-light">@{from?.username}</div>
          <div className="small text-color">{text}</div>
          <div className="pt-1">
            {type === "invite" ? <JoinButton groupID={groupID} /> : <></>}
            {type === "follow" ? <Big_Follow_Button id={from?._id} /> : <></>}
          </div>
        </div>
      </div>
      <div className="small text-color pe-1">
        {new Date(createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </Col>
  );
};
export default Notification;
