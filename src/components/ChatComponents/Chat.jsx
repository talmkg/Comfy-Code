import React from "react";

function ChatWindow(props) {
  const { name, surname, username, pfp, users } = props;
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-between">
      <div
        className="w-100"
        style={{
          height: "4rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      ></div>
    </div>
  );
}

export default ChatWindow;
