import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { useSelector } from "react-redux";

function ChatLabel(props) {
  const LoggedInUser = useSelector((state) => state.main.LoggedInUser[0]);
  const filter = props.chat.chat.users.filter(
    (user) => user._id !== LoggedInUser._id
  );
  const user = filter[0];
  const selectChat = () => {
    const setSelectedChat = props.setSelectedChat;
    const setSelectedUser = props.setSelectedUser;
    setSelectedChat(props.chat);
    setSelectedUser(user);
  };

  return (
    <div
      onClick={selectChat}
      id={props.chat.chat._id}
      className="w-100 overflow-hidden d-flex align-items-center justify-content-between p-2 text-color"
      style={{
        height: "4rem",
        // borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        cursor: "pointer",
      }}
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
          <div className=" text-truncate">
            {user.name} {user.surname}
          </div>
          <div className="small  d-flex align-items-center justify-content-start">
            <GoPrimitiveDot size={15} style={{ color: "#3ade55" }} />
            Online
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLabel;
