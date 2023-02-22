import {
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
  ListGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import { MdOutlineNotificationsNone, MdDone } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { HiHashtag } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useEffect } from "react";
import "./style.css";
import Follow_Button from "../Mini_Components/Follow_Button";
import User_Card from "../Mini_Components/User_Card";
import { getNotifications } from "../../redux/actions";
import Notification from "../Mini_Components/Notification";
import { useState } from "react";

import { io } from "socket.io-client";

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
    socket.on("welcome", (welcomeMessage) => {
      socket.on("loggedIn", (onlineUsersList) => {
        console.log("logged in event:", onlineUsersList);
        setLoggedIn(true);
        setOnlineUsers(onlineUsersList);
      });

      socket.on("updateOnlineUsersList", (onlineUsersList) => {
        console.log("2");
        console.log("A new user connected/disconnected");
        setOnlineUsers(onlineUsersList);
      });
    });
  });
  socket.on("newMessage", (newMessage) => {
    console.log("4");
    setRealChatHistory([...realChatHistory, newMessage]);
  });
  // socket.emit("requestAllMessages");
  // socket.on("AllMessages", (AllMessages) => {
  //   console.log(AllMessages);
  //   setRealChatHistory(AllMessages);
  // });
  const submitUsername = () => {
    socket.emit("setUsername", { username });
  };
  const sendMessage = () => {
    const newMessage = {
      sender: username,
      text: message,
      createdAt: new Date().toLocaleString("en-US"),
    };
    socket.emit("sendMessage", newMessage);

    setRealChatHistory([...realChatHistory, newMessage]);
  };

  useEffect(() => {
    submitUsername();
  }, []);
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
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
        }}
      >
        <div className="p-3 pb-2 pt-4">
          <Card
            className="text-light"
            style={{ backgroundColor: "#1F1D2D", height: "350px" }}
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
              <div style={styles.postBlock} className="scrollbar">
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

        <div className="p-3 pt-1 pb-2">
          <Card
            className="text-light"
            style={{ backgroundColor: "#1F1D2D", height: "550px" }}
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
              <div style={styles.postBlock} className="scrollbar">
                <div
                  className="d-flex flex-column justify-content-between"
                  style={{ overflow: "auto" }}
                >
                  <ListGroup>
                    {realChatHistory.map((message, index) => (
                      <ListGroup.Item
                        key={index}
                        className="mt-1 mb-1 rounded text-color"
                        style={{ backgroundColor: "#2A273D" }}
                      >
                        {<span className="text-color">@{message.sender}</span>}{" "}
                        | <span className="text-light"> {message.text}</span>
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
