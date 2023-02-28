import { Button, Modal, InputGroup, Form, Dropdown } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";
import React from "react";
import { AiOutlineQuestionCircle, AiOutlinePlus } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, GLOBAL_LOADING, LOGIN, TOKEN } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import UsersModal from "../Mini_Components/InviteModal";

function MyVerticallyCenteredModal(props) {
  const [usersModalShow, setUsersModalShow] = React.useState(false);
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createAPost = () => {
    //now we need to pass all required data there
    dispatch(createGroup(title, description, onHide));
  };
  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  const onHide = props.onHide;
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        className="text-light"
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div className="d-flex justify-content-between align-items-center p-3">
          <button
            type="button"
            className="btn-close btn-close-white m-0"
            aria-label="Close"
            onClick={props.onHide}
          ></button>
          <Button
            className="btn gradient-button d-flex align-items-center justify-content-around"
            style={{ borderRadius: "15px" }}
            onClick={createAPost}
          >
            <span className="d-flex align-items-center me-1">Post</span>
            <span className="d-flex align-items-center">
              <FaRegPaperPlane />
            </span>
          </Button>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="Title"
            className="bg-transparent"
            style={{ border: "none" }}
            placeholder="Enter the title of your project"
            value={title}
            onChange={(e) => onChangeHandler(e.target.value, setTitle)}
          />
        </Form.Group>
        <div
          className="me-3 mx-3"
          style={{ borderBottom: "1px solid gray" }}
        ></div>
        <InputGroup>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            className="bg-transparent"
            style={{ border: "none" }}
            placeholder="What's on your mind?"
            value={description}
            onChange={(e) => onChangeHandler(e.target.value, setDescription)}
          />
        </InputGroup>

        <div className=" d-flex justify-content-center text-color">
          <div>
            <h5 className="text-center mb-2">Team:</h5>
            <div className="active-button">
              1. Team-Leader: {LoggedInUser?.username} | {LoggedInUser?.name}{" "}
              {LoggedInUser?.surname}
            </div>
          </div>
        </div>

        {/*MINI BUTTONS */}
        <div className="d-flex justify-content-between text-color pe-3 px-3 pb-3 pt-1">
          <div className="">
            <FaUpload size={25} className="me-2" />
            {/* <BsEmojiSmile size={25} className="me-2" /> */}
          </div>
          <div>
            <AiOutlineQuestionCircle size={25} />
          </div>
        </div>
      </Modal>

      <UsersModal
        show={usersModalShow}
        onHide={() => setUsersModalShow(false)}
      />
    </>
  );
}
const Left_Sidebar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch({
      type: LOGIN,
      payload: [],
    });
    dispatch({
      type: TOKEN,
      payload: [],
    });
    window.location.assign("/login");
  };

  if (!LoggedInUser) {
    return <div></div>;
  } else {
    return (
      <>
        <div
          // className="position-sticky glass"
          className="position-sticky"
          style={{
            backgroundColor: "#1F1D2D",
            width: "15vw",
            minWidth: "250px",
            height: "100vh",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: "99",
            borderRight: "1px solid rgba(255, 255, 255, 0.192)",
          }}
          id="main"
        >
          <div className="mt-3">
            <div className="w-100">
              <div className="text-center pt-4 pb-2">
                <Dropdown
                  drop="down-centered"
                  key="down-centered"
                  id="dropdown-button-drop-down-centered"
                >
                  <Dropdown.Toggle className="bg-light-color">
                    @{LoggedInUser?.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="text-light bg-light-color">
                    <Dropdown.Item
                      onClick={Logout}
                      className="text-center text-light"
                      id="dropdown-buttons"
                    >
                      Log out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex justify-content-center pb-5 pt-2">
                <img
                  src={LoggedInUser?.pfp}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    width: "170px",
                    height: "170px",
                  }}
                />
              </div>
              <div>
                <Link to="/home" className="sidebar-button-div">
                  <Button className="sidebar-button">
                    <span>Home</span>
                  </Button>
                </Link>
              </div>
              <div>
                <div className="sidebar-button-div">
                  <Button className="sidebar-button">
                    <span>Notifications</span>
                  </Button>
                </div>
              </div>
              <div>
                <div className="sidebar-button-div">
                  <Button className="sidebar-button">
                    <span>Chat</span>
                  </Button>
                </div>
              </div>

              <div>
                <div className="sidebar-button-div">
                  <Button className="sidebar-button">
                    <span>Bookmarks</span>
                  </Button>
                </div>
              </div>
              <div>
                <Link to="/profile" className="sidebar-button-div pb-2">
                  <Button className="sidebar-button">
                    <span>Profile</span>
                  </Button>
                </Link>
              </div>
              <hr className="text-light mx-2 me-2" />
              <div className="d-flex justify-content-center">
                <Button
                  className="gradient-button center-flex m-1 w-50 rounded-5"
                  onClick={() => setModalShow(true)}
                >
                  <span className="d-flex align-items-center me-1">
                    <MdOutlineEdit size={22} />
                  </span>
                  <span className="d-flex align-items-center">Post</span>
                </Button>
              </div>
            </div>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </>
    );
  }
};
export default Left_Sidebar;
