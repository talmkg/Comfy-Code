import { Card, Row, ListGroup, Form, FormControl } from "react-bootstrap";
import { MdOutlineNotificationsNone, MdDone } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import "./style.css";
import { getNotifications } from "../../redux/actions";
import Notification from "../Mini_Components/Notification";
import { useState } from "react";
import { io } from "socket.io-client";
import MiniProfileTemplate from "../Middle_Feed&Nav/MiniProfileTemplate";
import { Link } from "react-router-dom";

const socket = io("http://localhost:3002", { transports: ["websocket"] });
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
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  let groups = useSelector((state) => state.groups.groups);
  const myGroups = useSelector((state) => state?.usersGroups);
  const Notifications = useSelector(
    (state) => state?.notifications?.notifications
  );
  const username = LoggedInUser?.username;
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [realChatHistory, setRealChatHistory] = useState([]);

  useEffect(() => {
    if (LoggedInUser) {
      socket.on("welcome", (welcomeMessage) => {
        socket.on("loggedIn", (onlineUsersList) => {
          setLoggedIn(true);
          setOnlineUsers(onlineUsersList);
        });
        socket.on("updateOnlineUsersList", (onlineUsersList) => {
          setOnlineUsers(onlineUsersList);
        });
      });
      //when new message comes   ----------------------------
      socket.on("newMessage", (newMessage) => {
        setRealChatHistory([...realChatHistory, newMessage]);
      });
      socket.emit("requestChatHistory");
      socket.on("chatHistory", (chatHistory) => {
        setRealChatHistory(chatHistory);
      });
    }
  }, [LoggedInUser]);

  const scrollToBottom = () => {
    const generalChat = document.getElementById("generalChat");
    generalChat.scrollTop = generalChat.scrollHeight;
  };

  const submitUsername = () => {
    socket.emit("setUsername", { username });
  };
  const sendMessage = () => {
    const newMessage = {
      username: LoggedInUser.username,
      pfp: LoggedInUser.pfp,
      user_id: LoggedInUser._id,
      text: message,
      // createdAt: new Date().toLocaleString("en-US"),
    };
    socket.emit("sendMessage", newMessage);
    setRealChatHistory([...realChatHistory, newMessage]);
  };
  useEffect(() => {
    submitUsername();
    // dispatch(getNotifications());
  }, []);
  useEffect(() => {
    if (LoggedInUser) {
      scrollToBottom();
    }
  });
  if (!LoggedInUser) {
    return <div></div>;
  } else {
    return (
      <div
        className="position-sticky"
        style={{
          backgroundColor: "#191724",
          width: "20vw",
          height: "100vh",
          right: 0,
          top: 0,
          bottom: 0,
          borderLeft: "1px solid rgba(255, 255, 255, 0.192)",
          zIndex: "0",
          overflow: "hidden",
        }}
      >
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
                    <Row className="g-0 pe-1 px-1">
                      {Notifications ? (
                        Notifications?.map((notification, i) => {
                          return (
                            <Notification
                              {...notification}
                              key={i}
                              myGroups={myGroups}
                            />
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
                <MdDone size={20} className="me-3" />
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
                    {realChatHistory.map((message, index) => (
                      <ListGroup.Item
                        key={index}
                        className="mt-1 mb-1 rounded text-color d-flex justify-content-between"
                        style={{ backgroundColor: "#2A273D" }}
                      >
                        <div>
                          <span
                            className="text-color pe-1 position-relative"
                            id="profile-picture-post"
                          >
                            <img
                              src={message.pfp}
                              style={{
                                width: "35px",
                                borderRadius: "50%",
                                position: "relative",
                              }}
                              className="me-2"
                            />
                            {LoggedInUser._id === message.user_id ? (
                              <Link
                                to={`/profile`}
                                style={{ textDecoration: "none" }}
                                className="text-color"
                              >
                                {message.username}
                              </Link>
                            ) : (
                              <Link
                                to={`/profile/${message.user_id}`}
                                style={{ textDecoration: "none" }}
                                className="text-color"
                              >
                                {message.username}
                              </Link>
                            )}

                            <span className="me-2 mx-2">|</span>

                            <span className="text-light">{message.text}</span>
                          </span>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="p-0">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
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
