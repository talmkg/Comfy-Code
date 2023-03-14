import { useEffect } from "react";
import { Badge, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import GlobalTopNav from "../../components/GlobalTopNav/GlobalTopNav";
import Notification from "../../components/Mini_Components/Notification";
import {
  fetchUsersGroups,
  getChatMessages,
  sendDirectMessage,
} from "../../redux/actions";
import "./styles.css";
import { useState } from "react";
import ChatLabel from "../../components/ChatComponents/ChatLabel";
import { AiOutlineInfoCircle } from "react-icons/ai";
const Chat = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const LoggedInUser = useSelector((state) => state.main.LoggedInUser[0]);
  const chats = useSelector((state) => state.main.chats);
  const scrollToBottom = () => {
    if (selectedChat && selectedUser) {
      const generalChat = document.getElementById("chat");
      generalChat.scrollTop = generalChat.scrollHeight;
    }
  };
  useEffect(() => {
    if (selectedChat && selectedUser) {
      scrollToBottom();
    }
  });
  //
  //
  //
  //lets check is this filtered user is in the list of socket online users
  const onlineUsers = useSelector((state) => state.main.socket_users_list);
  console.log(onlineUsers);
  return (
    <div
      className="flex-fill text-light overflow-hidden"
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#191724",
      }}
    >
      <GlobalTopNav identifier={"chat"} />
      <div
        className=" d-flex justify-content-center  mt-4"
        style={{ height: "90vh" }}
      >
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
              {chats.map((chat, i) => {
                return (
                  <div className="w-100 chat-label m-1" key={i}>
                    <ChatLabel
                      chat={chat}
                      setSelectedChat={setSelectedChat}
                      setSelectedUser={setSelectedUser}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ width: "70%", height: "100%" }}>
              {selectedUser !== false || selectedChat !== false ? (
                <div className="w-100 h-100 d-flex flex-column align-items-center position-relative">
                  <div
                    className="w-100 sticky-top d-flex justify-content-between align-items-center pe-3 px-3"
                    style={{
                      top: 0,
                      height: "4.5rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <div className="fs-5 text-color">
                      {selectedUser.name} {selectedUser.surname}
                    </div>
                    <div>
                      <AiOutlineInfoCircle size={25} />
                    </div>
                  </div>
                  <div
                    className="w-100 scrollbar p-2 position-relative"
                    id="chat"
                    style={{ overflowY: "scroll", height: "100%" }}
                  >
                    {selectedChat?.messages ? (
                      selectedChat?.messages?.map((message, i) => {
                        return (
                          <div key={i}>
                            <div
                              className={
                                message.from !== LoggedInUser._id &&
                                message.from_mongo !== LoggedInUser._id
                                  ? "d-flex justify-content-start p-1"
                                  : "d-flex justify-content-end p-1"
                              }
                            >
                              <div
                                className="p-1 rounded-2 d-flex align-items-start"
                                style={{
                                  backgroundColor: "#2A273D",
                                  maxWidth: "50%",
                                }}
                              >
                                <div>
                                  {message.from !== LoggedInUser._id &&
                                  message.from_mongo !== LoggedInUser._id ? (
                                    <img
                                      className="rounded-circle me-1"
                                      src={selectedUser.pfp}
                                      style={{ width: "35px" }}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="me-1 mx-1">{message.text}</div>
                                {message.from === LoggedInUser._id ||
                                message.from_mongo === LoggedInUser._id ? (
                                  <img
                                    className="rounded-circle mx-1"
                                    src={LoggedInUser.pfp}
                                    style={{ width: "35px" }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        {selectedChat ? (
                          <>
                            <div
                              id="center"
                              className="d-flex flex-column align-items-center"
                            >
                              <img
                                src="https://78.media.tumblr.com/a71bc83661d3be8192c7d6cd62e2e966/tumblr_pa2knrX5Zz1xu0hh4o1_500.gif"
                                style={{
                                  objectFit: "cover",
                                  width: "50%",
                                  opacity: "85%",
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className={
                      selectedChat.chat ? "w-100 position-relative" : "d-none"
                    }
                    style={{
                      bottom: 0,
                    }}
                  >
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();

                        const data = {
                          chat: selectedChat.chat._id,
                          from: LoggedInUser,
                          to: selectedUser._id,
                          text: message,
                        };
                        dispatch(sendDirectMessage(data));
                        setMessage("");
                      }}
                    >
                      <Form.Control
                        placeholder="Write your message here"
                        className="bg-transparent rounded-0"
                        style={{
                          border: "none",
                          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
