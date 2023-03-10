import React from "react";

function ChatOff() {
  return (
    <div>
      <div
        className="w-100 overflow-hidden d-flex align-items-center p-1"
        style={{
          height: "4rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <img
          src="https://i.pinimg.com/564x/69/d1/7e/69d17efac3b97c5fbb41df9db71e7b3a.jpg"
          className="rounded-circle me-2"
          style={{
            aspectRatio: "1/1",
            objectFit: "cover",
            height: "100%",
          }}
        />
        <div>
          <div className="fs-5 text-muted">Jason Davidson</div>
          <div className="small text-muted d-flex align-items-center justify-content-start">
            <GoPrimitiveDot size={15} style={{ color: "gray" }} /> Offline
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatOff;
