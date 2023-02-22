import { Card, Row, Col, ProgressBar, Button } from "react-bootstrap";
import React from "react";
import Follow_Button from "../Mini_Components/Follow_Button";
const User_Card = (props) => {
  const { pfp, username, name, surname, _id, bio, custom_capture } = props;
  return (
    <Col
      xs={12}
      className="mt-2 rounded-4 d-flex align-items-center pe-2 px-2"
      style={{
        height: "70px",
        backgroundColor: "#2A273D",
      }}
    >
      <div className="w-100 d-flex align-items-center">
        <div style={{ width: "21%" }}>
          <img
            src={pfp}
            style={{
              width: "60px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div style={{ width: "79%" }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div>@{username}</div>
              {custom_capture ? (
                <div className="text-color" style={{ fontSize: "15px" }}>
                  {custom_capture}
                </div>
              ) : (
                <span className="text-truncate">{bio}</span>
              )}
            </div>
            <Follow_Button id={_id} />
          </div>
        </div>
      </div>
    </Col>
  );
};
export default User_Card;
