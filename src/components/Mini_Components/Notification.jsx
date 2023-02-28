import { Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { joinTheGroup } from "../../redux/actions";
import Follow_Button from "./Follow_Button";

const Notification = (props) => {
  const { group, bio, from, type, text, myGroups } = props;
  const dispatch = useDispatch();

  const joinTheTeamAction = () => {
    dispatch(joinTheGroup(group));
  };
  let alreadyInGroup = myGroups?.memberOf?.find((o) => o._id === group);
  if (type === "invite") {
    return (
      <Col
        xs={12}
        className="mt-2 rounded-4 p-2"
        style={{
          height: "100%",

          backgroundColor: "#2A273D",
        }}
      >
        <div className="w-100 d-flex align-items-center">
          <div style={{ width: "21%" }}>
            <img
              src={from?.pfp}
              style={{
                width: "60px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div style={{ width: "79%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div>@{from?.username}</div>
                <div>{text}</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" text-center">
          {alreadyInGroup ? (
            <Button className="m-1 gradient-button">Joined</Button>
          ) : (
            <Button className="m-1 gradient-button" onClick={joinTheTeamAction}>
              Join
            </Button>
          )}
        </div>
      </Col>
    );
  }
  if (type === "follow" || "unfollow") {
    return (
      <Col
        xs={12}
        className="mt-2 rounded-4 p-2"
        style={{
          height: "100%",

          backgroundColor: "#2A273D",
        }}
      >
        <div className="w-100 d-flex align-items-center">
          <div style={{ width: "21%" }}>
            <img
              src={from?.pfp}
              style={{
                width: "60px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div style={{ width: "79%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div>@{from?.username}</div>
                <div>{text}</div>
              </div>
              {type === "unfollow" ? <></> : <Follow_Button id={from?._id} />}
            </div>
          </div>
        </div>
      </Col>
    );
  }
};
export default Notification;
