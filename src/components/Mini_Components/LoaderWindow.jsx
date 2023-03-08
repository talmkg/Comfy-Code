import React from "react";

function LoaderWindow() {
  return (
    <div
      className=" center-flex text-light rounded-3"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: "100",
        backgroundColor: "#1f1d2d",
      }}
      id="center"
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          src="https://i.pinimg.com/originals/1e/85/d8/1e85d85797303b24c110f39e72ce3de2.gif"
          style={{ width: "40%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default LoaderWindow;
