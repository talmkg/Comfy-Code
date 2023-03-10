import { useEffect } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import GlobalTopNav from "../../components/GlobalTopNav/GlobalTopNav";
import Notification from "../../components/Mini_Components/Notification";
import { fetchUsersGroups, getChatMessages } from "../../redux/actions";

import "./styles.css";
import ChatOn from "../../components/ChatComponents/ChatOn";
import ChatWindow from "../../components/ChatComponents/Chat";
import { useState } from "react";

const Chat = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUsersGroups());
  // }, []);
  const [selectedChat, setSelectedChat] = useState([]);
  const [messages, setMessages] = useState([]);
  // <ChatWindow />
  const chats = useSelector((state) => state.main.chats);
  useEffect(() => {
    console.log(selectedChat);
  });
  useEffect(() => {
    //fetch this chat messages
    dispatch(getChatMessages(selectedChat, setMessages));
  }, [selectedChat]);
  return (
    <>
      <div
        className="flex-fill text-light overflow-hidden"
        style={{
          width: "100%",
          backgroundColor: "#191724",
        }}
      >
        <GlobalTopNav identifier={"chat"} />
        <div className="w-100 h-100 d-flex justify-content-center mt-4">
          <div
            className="h-100 rounded-top"
            style={{ width: "950px", backgroundColor: "#1d1b2a" }}
          >
            <div className="h-100 w-100 d-flex">
              <div
                style={{
                  width: "30%",
                  borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                className="h-100 flex-column d-flex align-items-center justify-content-start"
              >
                {chats.map((chat) => {
                  return <ChatOn {...chat} setSelectedChat={setSelectedChat} />;
                })}
              </div>
              <div style={{ width: "70%", height: "100%" }}>
                {messages.map((message) => {
                  return <div>{message.text}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
