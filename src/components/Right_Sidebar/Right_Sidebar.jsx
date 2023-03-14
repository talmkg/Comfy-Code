import { Card, Row, ListGroup, Form, FormControl } from "react-bootstrap";
import { MdOutlineNotificationsNone, MdDone } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import "./style.css";
import {
  GENERAL_CHAT_HISTORY,
  getNotifications,
  sendMessage,
  sendNotification,
} from "../../redux/actions";
import { useState } from "react";
import { io } from "socket.io-client";
import MiniProfileTemplate from "../Middle_Feed&Nav/MiniProfileTemplate";
import { Link } from "react-router-dom";
import sound from "../../Sounds/notification.mp3";
import Notification from "../Mini_Components/Notification";

const Right_Sidebar = () => {
  const dispatch = useDispatch();
  const options = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = options[d.getDay()];
  const [message, setMessage] = useState("");
  const LoggedInUser = useSelector((state) => state?.main.LoggedInUser[0]);
  const loggedIn = useSelector((state) => state?.main.socket_connected);
  const myGroups = useSelector((state) => state?.main.usersGroups);
  const Notifications = useSelector((state) => state?.main.notifications);
  let realChatHistory = useSelector(
    (state) => state?.main.general_chat_history[0]
  );
  const scrollToBottom = () => {
    const generalChat = document.getElementById("generalChat");
    generalChat.scrollTop = generalChat.scrollHeight;
  };
  const dispatchSendMessage = () => {
    dispatch(sendMessage(LoggedInUser, message));
  };
  useEffect(() => {
    if (LoggedInUser) {
      scrollToBottom();
    }
  });
  useEffect(() => {}, []);
  if (!LoggedInUser) {
    return <div></div>;
  } else {
    return (
      <div id="right-sidebar">
        <div className="p-3 pb-2 pt-4" style={{ height: "40vh" }}>
          <Card
            className="text-light h-100"
            style={{ backgroundColor: "#1F1D2D" }}
          >
            <Card.Header
              className="d-flex align-items-center justify-content-between"
              style={{ backgroundColor: "#2a273d" }}
            >
              <div className="d-flex align-items-center">
                <MdOutlineNotificationsNone className="me-2" size={20} />
                <p className="p-0 m-0">Notifications</p>
              </div>

              <div className="d-flex align-items-center">
                <MdDone size={20} className="me-3" />
                <FiSettings size={20} />
              </div>
            </Card.Header>
            <Card.Body className="overflow-hidden p-0">
              <div
                style={styles.postBlock}
                className="scrollbar"
                id="notifications"
              >
                <div>
                  <div>
                    <Row className="g-0">
                      {Notifications[0] ? (
                        Notifications?.map((notification, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                borderBottom:
                                  "1px solid rgba(255, 255, 255, 0.192)",
                              }}
                            >
                              <Notification {...notification} key={i} />
                            </div>
                          );
                        })
                      ) : (
                        <div id="center" className="text-center text-color">
                          You have no notifications yet
                        </div>
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="p-3 pt-1 pb-2" style={{ height: "60vh" }}>
          <Card
            className="text-light"
            style={{ backgroundColor: "#1F1D2D", height: "100%" }}
          >
            <Card.Header
              className="d-flex align-items-center justify-content-between"
              style={{ backgroundColor: "#2a273d" }}
            >
              <div className="d-flex align-items-center">
                <p className="p-0 m-0">General Chat</p>
              </div>

              <div className="d-flex align-items-center">
                {/* <MdDone size={20} className="me-3" /> */}
                <FiSettings size={20} />
              </div>
            </Card.Header>
            <Card.Body className="overflow-hidden p-1">
              <div
                style={styles.postBlock}
                id="generalChat"
                className="scrollbar"
              >
                <div className="d-flex flex-column justify-content-between">
                  <ListGroup>
                    {realChatHistory?.map((message, index) => {
                      return (
                        <ListGroup.Item
                          key={index}
                          className=" rounded text-color d-flex justify-content-between bg-transparent border-0"
                        >
                          <div className="text-color pe-1">
                            <img
                              src={message.pfp}
                              style={{
                                width: "30px",
                                borderRadius: "50%",
                                position: "relative",
                              }}
                              className="me-2"
                            />

                            <Link
                              to={`/profile/${message.user_id}`}
                              style={{ textDecoration: "none" }}
                              className="text-color"
                            >
                              {message.username}
                            </Link>

                            <span className="me-2 mx-2">|</span>

                            <span className="text-light">{message.text}</span>
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="p-0">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatchSendMessage();
                  setMessage("");
                }}
              >
                <FormControl
                  placeholder="Write your message here"
                  className="bg-transparent"
                  style={{ border: "none" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!loggedIn}
                />
              </Form>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
};
const styles = {
  postBlock: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    overflowY: "auto",
    overflowX: "hidden",
  },

  progressBar: {
    width: "100%",
    height: 32,
    margin: "auto",
    backgroundColor: "#2A273D",
  },
  scrolled: {
    height: "100%",
    backgroundColor: "#541a39",
  },
  centeredItem: {
    textAlign: "center",
  },
};
export default Right_Sidebar;
