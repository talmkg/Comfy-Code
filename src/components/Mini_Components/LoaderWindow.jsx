import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";
import "./ProgressBar.css";
function LoaderWindow() {
  const progress_state = useSelector((state) => state.loader.loadingProgress);
  return (
    <div
      className=" center-flex text-light"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: "100",
        backgroundColor: "rgb(31, 29, 45,1)",
        // backgroundColor: "rgb(31, 29, 45,0.5)",
      }}
      id="center"
    >
      <div className="d-flex flex-column justify-content-center align-items-center position-relative">
        <img
          src="https://i.pinimg.com/originals/1e/85/d8/1e85d85797303b24c110f39e72ce3de2.gif"
          style={{
            width: "40%",
            height: "auto",
            visibility: "visible",
          }}
        />
        {/* <Spinner /> */}
        {/* const now = 60; */}
        {/* <h1>{progress_state}</h1> */}
        <div
          className="w-100 rounded-5 d-flex justify-content-start"
          style={{ height: "1rem", backgroundColor: "white" }}
        >
          <div
            className="h-100 rounded-5"
            style={{
              backgroundColor: "violet",
              width: progress_state ? `${progress_state}%` : "0%",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderWindow;
