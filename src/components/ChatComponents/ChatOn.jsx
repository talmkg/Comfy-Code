import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { useSelector } from "react-redux";

function ChatOn(props) {
  console.log(props);
  const LoggedInUser = useSelector((state) => state.main.LoggedInUser[0]);
  const { _id, name, surname, pfp, users } = props;
  const filter = users.filter((user) => user._id !== LoggedInUser._id);
  const user = filter[0];
  const setSelectedChat = props.setSelectedChat;
  const setChat = () => {
    setSelectedChat(_id);
  };
  return (
    <div
      className="w-100 overflow-hidden d-flex align-items-center justify-content-between p-1 text-color"
      style={{
        height: "4rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      }}
      onClick={setChat}
    >
      <div className="h-100 d-flex" style={{ maxWidth: "80%" }}>
        <img
          src={user.pfp}
          className="rounded-circle me-2"
          style={{
            aspectRatio: "1/1",
            objectFit: "cover",
            height: "100%",
            width: "max-content",
          }}
        />
        <div style={{ maxWidth: "80%" }}>
          <div className="fs-5 text-truncate">
            {user.name} {user.surname}
          </div>
          <div className="small  d-flex align-items-center justify-content-start">
            <GoPrimitiveDot size={15} style={{ color: "#3ade55" }} />
            Online
          </div>
        </div>
      </div>

      {/* <div className="pe-2">
      <Badge pill bg="success">
        3
      </Badge>
    </div> */}
    </div>
  );
}

export default ChatOn;
