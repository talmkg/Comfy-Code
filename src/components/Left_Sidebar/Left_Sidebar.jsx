import {
  Button,
  Modal,
  InputGroup,
  Form,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { FaUpload, FaUsers } from "react-icons/fa";
import {
  MdOutlineEdit,
  MdOutlineExplore,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { useEffect, useState } from "react";

import React from "react";
import {
  AiOutlineQuestionCircle,
  AiOutlinePlus,
  AiOutlinePlusCircle,
  AiFillLock,
} from "react-icons/ai";
import { BsLock, BsUnlock } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroup,
  createPost,
  getHashtags,
  LOGIN,
  TOKEN,
} from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import UsersModal from "../Mini_Components/InviteModal";
import TeamSizeSelect from "../Mini_Components/TeamSizeSelect/TeamSizeSelect";
import languages from "../../Data/Languages/Languages.json";
import { BiHome, BiLogOut } from "react-icons/bi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function MyVerticallyCenteredModal(props) {
  const [usersModalShow, setUsersModalShow] = React.useState(false);
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const [Hashtags, setReduxHashtags] = useState([
    { title: "#react" },
    { title: "#javascript" },
    { title: "#python" },
    { title: "#nodejs" },
    { title: "#spring" },
    { title: "#express" },
    { title: "#rust" },
    { title: "#java" },
    { title: "#flask" },
    { title: "#discord" },
    { title: "#github" },
  ]); //redux
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [isPrivate, setPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState(5);
  const [image, setImage] = useState(false);
  const [postImage, setPostImage] = useState(undefined);
  const [postType, setPostType] = useState(true);
  const [postText, setPostText] = useState("");
  const [postPreview, setPostPreview] = useState(undefined);
  const [isImagePreviewOptionOn, setIsImagePreviewOptionOn] = useState(false);
  const [isCustomHashtagInputActive, setCustomHashtagInputActive] =
    useState(false);
  const [customHashtagInput, setCustomHashtagInput] = useState("");
  const createAGroup = () => {
    const formData = new FormData();

    formData.append("cover", image);

    dispatch(createGroup(title, description, hashtags, formData, onHide));
    setTitle("");
    setDescription("");
    setHashtags([]);
  };
  const createAPost = () => {
    const formData = new FormData();
    formData.append("text", postText);
    formData.append("postImage", postImage);

    dispatch(createPost(formData, onHide));
    setPostText("");
    setPostImage(undefined);
    setPostPreview(undefined);
  };
  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  const onHide = props.onHide;
  const addHashtag = (hashtag) => {
    if (hashtags.includes(hashtag)) {
      const filtered = hashtags.filter((obj) => obj._id !== hashtag._id);
      setHashtags(filtered);
    } else {
      setHashtags([...hashtags, hashtag]);
    }
  };
  const addCustomHashtag = () => {
    setCustomHashtagInputActive(true);
  };
  const submitNewHashtag = () => {
    setCustomHashtagInputActive(false);
    const hashtag = { title: `#${customHashtagInput}` };
    setHashtags([...hashtags, hashtag]);
    setReduxHashtags([...Hashtags, hashtag]);
    setCustomHashtagInput("");
  };
  const changePrivacy = () => {
    setPrivate(isPrivate === true ? false : true);
  };
  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const activatePostImageInput = () => {
    const elem = document.getElementById("chooseImagePost");
    elem.click();
  };
  const postImageChangeHandler = (e) => {
    setPostImage(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPostPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        className="text-light "
        style={{ backdropFilter: "blur(2px)" }}
      >
        <div className="w-100">
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
              onClick={postType ? createAPost : createAGroup}
            >
              <span className="d-flex align-items-center me-1">Post</span>
              <span className="d-flex align-items-center">
                <FaRegPaperPlane />
              </span>
            </Button>
          </div>
          <div
            className="w-100 rounded-5 d-flex justify-content-between"
            style={{
              height: "60px",
              position: "sticky",
              top: 0,
            }}
          >
            <div style={{ width: "50%" }} className="center-flex">
              <Button
                className={`${
                  postType ? "active-button" : "sidebar-button"
                } w-75`}
                onClick={(e) => {
                  setPostType(true);
                }}
              >
                <span>Post</span>
              </Button>
            </div>
            <div style={{ width: "50%" }} className="center-flex">
              <Button
                className={`${
                  postType === false ? "active-button" : "sidebar-button"
                } w-75`}
                onClick={(e) => {
                  setPostType(false);
                }}
              >
                <span>Group</span>
              </Button>
            </div>
          </div>
          {/* 1.nah. true/false. create a switch and fuck it all man */}
          {/*2. we actually can delete input of a file and leave upload icon. In settings/prof we are already using preview - se once we choose file we can preview it in a small box or in original width.*/}
          {/*3. Private groups. Once invited, you will be added to an array of accessed-users of this group (only people from this list will be able to join if type===private). You can select people to whom invites will be sent after you create a group (say to users how invites will be sent ofc).*/}
          {/*4. Finish implementing posting posts and create a route for user's newsfeed - basically last 10 groups + followed user's posts wont wont, since it will start repeating posts or groups in one point. But if you find all groups and needed posts, create a sorted array and then limit - its gonna be perfect.*/}
          {}
          {postType ? (
            <>
              <div className="post-post w-100 h-100 d-flex flex-column justify-content-between">
                {" "}
                <div>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      className="bg-transparent"
                      style={{ border: "none" }}
                      placeholder="What's on your mind?"
                      value={postText}
                      onChange={(e) =>
                        onChangeHandler(e.target.value, setPostText)
                      }
                    />
                  </InputGroup>
                </div>
                <div
                  className={
                    postPreview === undefined ? "d-none" : " pe-3 px-3 pb-2"
                  }
                >
                  <div
                    style={{
                      width: "20%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={postPreview !== undefined ? postPreview : undefined}
                      className={
                        postPreview !== undefined
                          ? "rounded-2 post-image-preview w-100"
                          : ""
                      }
                      onClick={(e) => {
                        setIsImagePreviewOptionOn(
                          isImagePreviewOptionOn ? false : true
                        );
                      }}
                      style={{
                        aspectRatio: postPreview ? "1/1" : "none",
                        objectFit: "cover",
                      }}
                    />
                    <div className={isImagePreviewOptionOn ? "" : "d-none"}>
                      <div
                        id="center-bottom"
                        style={{
                          backgroundColor: "#312e47",
                          height: "max-content",
                          width: "150px",
                        }}
                        className="rounded-2 p-1 "
                      >
                        <Button
                          size="sm"
                          className="options-left-sidebar-button danger-button center-flex"
                          onClick={(e) => {
                            setPostImage(undefined);
                            setPostPreview(undefined);
                          }}
                        >
                          <span>
                            <RxCross2 size={20} className="me-1" />
                            Delete
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center text-color pe-2 px-2 pb-2 pt-2">
                    <div className="">
                      <FaUpload
                        size={28}
                        className="me-2"
                        onClick={activatePostImageInput}
                      />
                      {/* <BsEmojiSmile size={28} className="me-2" /> */}
                      <Form.Control
                        type="file"
                        id="chooseImagePost"
                        style={{ display: "none" }}
                        onChange={(e) => postImageChangeHandler(e)}
                        accept=".jpg, .jpeg, .png"
                        multiple
                      />
                    </div>

                    <div>
                      <AiOutlineQuestionCircle size={28} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="post-group">
              <Form.Group className="mb-3">
                <Form.Control
                  type="Title"
                  className="bg-transparent"
                  style={{ border: "none" }}
                  placeholder="Enter the title of your group or a project"
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
                  onChange={(e) =>
                    onChangeHandler(e.target.value, setDescription)
                  }
                />
              </InputGroup>

              <div className="pt-2">
                <span className="px-2" style={{ color: "#686f7f" }}>
                  Add suitable hashtags
                </span>
              </div>
              <div className="p-3 pt-2 pb-0">
                <Row className="text-color">
                  {Hashtags.map((hashtag, index) => {
                    const addHashtagInside = function () {
                      addHashtag(hashtag);
                    };

                    if (hashtags.includes(hashtag)) {
                      return (
                        <div
                          key={index}
                          className=" rounded-3 p-1 px-2 pe-2 mb-2 mx-1"
                          style={{
                            backgroundColor: "#362e44",
                            cursor: "pointer",
                            width: "max-content",
                            height: "35px",
                          }}
                          onClick={addHashtagInside}
                        >
                          {hashtag.title}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className=" rounded-3 p-1 px-2 pe-2 mb-2 mx-1"
                          style={{
                            backgroundColor: "#46395b",
                            cursor: "pointer",
                            width: "max-content",
                            height: "35px",
                          }}
                          id={hashtag._id}
                          onClick={addHashtagInside}
                        >
                          {hashtag.title}
                        </div>
                      );
                    }
                  })}
                  <div
                    className="d-flex align-items-center rounded-3 p-1 px-2 pe-2 mb-2 mx-1"
                    id="custom_hashtag_input"
                    style={{
                      backgroundColor: "#46395b",
                      cursor: "pointer",
                      width: "200px",
                      height: "35px",
                    }}
                    onClick={addCustomHashtag}
                  >
                    {isCustomHashtagInputActive === true ? (
                      <>
                        <div className="w-100 h-100 d-flex">
                          <Form.Control
                            placeholder="#"
                            value={customHashtagInput}
                            onChange={(e) =>
                              onChangeHandler(
                                e.target.value,
                                setCustomHashtagInput
                              )
                            }
                            className="bg-transparent border-0 w-75 h-100  "
                          />
                          <div
                            className="flex-fill h-100 d-flex justify-content-end align-items-center "
                            onClick={submitNewHashtag}
                          >
                            <AiOutlinePlusCircle size={25} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="d-flex align-items-center">
                        <AiOutlinePlus size={18} className="me-1" /> Add custom
                        hashtag
                      </div>
                    )}
                  </div>
                </Row>
              </div>
              <div className="w-100">
                <div
                  className="d-flex justify-content-around align-items-center w-100 pb-3"
                  // style={{ height: "4vh" }}
                >
                  <div className="w-25 text-center">
                    <div className="p-1" style={{ color: "#686f7f" }}>
                      Privacy
                    </div>
                    {isPrivate ? (
                      <>
                        <Button
                          className="center-flex switch-button-private w-100"
                          onClick={changePrivacy}
                        >
                          <span className="me-2">Private</span>{" "}
                          <BsLock size={18} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="center-flex switch-button-public w-100"
                          onClick={changePrivacy}
                        >
                          <span className="me-2">Public</span>{" "}
                          <BsUnlock size={18} />
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="w-25 text-center">
                    <div className="p-1" style={{ color: "#686f7f" }}>
                      Language
                    </div>
                    <Form.Select
                      style={{ border: "none" }}
                      className="text-color select-language"
                    >
                      {languages.map((language, index) => {
                        if (language.name === "English") {
                          return (
                            <option key={index} selected>
                              {language.name}
                            </option>
                          );
                        } else {
                          return (
                            <option key={index} value={[index]}>
                              {language.name}
                            </option>
                          );
                        }
                      })}
                    </Form.Select>
                  </div>
                  <div className=" w-25 text-center">
                    <div className="p-1" style={{ color: "#686f7f" }}>
                      Team Size
                    </div>
                    <div className="parentdiv w-100">
                      <TeamSizeSelect min={0} max={10} />
                    </div>
                  </div>
                </div>
                <div className="p-2 pt-0 pb-3 choose-image text-center">
                  <div className="p-1" style={{ color: "#686f7f" }}>
                    Add cover for your project
                  </div>
                  <Form.Control
                    type="file"
                    id="chooseImage"
                    onChange={(e) => imageChangeHandler(e)}
                    accept=".jpg, .jpeg, .png"
                    multiple
                  />
                </div>
              </div>
              <div className=" d-flex justify-content-center text-color">
                <div>
                  <h5 className="text-center mb-2">Team:</h5>
                  <div className="active-button flex-column">
                    <div>
                      1. Team-Leader: {LoggedInUser?.username} |{" "}
                      {LoggedInUser?.name} {LoggedInUser?.surname}
                    </div>
                  </div>
                </div>
              </div>

              {/*MINI BUTTONS */}
              <div className="d-flex justify-content-between align-items-center text-color pe-3 px-3 pb-3 pt-1">
                <div className="">
                  <FaUpload size={28} className="me-2" />
                  {/* <BsEmojiSmile size={28} className="me-2" /> */}
                </div>

                <div>
                  <AiOutlineQuestionCircle size={28} />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* <UsersModal
        show={usersModalShow}
        onHide={() => setUsersModalShow(false)}
      /> */}
    </>
  );
}
const Left_Sidebar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    dispatch({
      type: LOGIN,
      payload: [],
    });
    dispatch({
      type: TOKEN,
      payload: [],
    });

    navigate("/login");
  };
  const options = () => {
    console.log("toggle");
    const elem = document.getElementById("toggle");
    elem.click();
  };
  useEffect(() => {
    console.log(isOptions);
  });
  if (!LoggedInUser) {
    return <div></div>;
  } else {
    return (
      <>
        <div id="left-sidebar">
          <div className="h-100 w-100">
            <div className="w-100 h-100 " id="left-sidebar-content-sm">
              <div className="d-flex justify-content-center position-relative">
                <img
                  id="pfp-left-sidebar"
                  src={LoggedInUser?.pfp}
                  style={{
                    borderRadius: "25%",
                    objectFit: "cover",
                    width: "60px",
                    height: "60px",
                  }}
                  onClick={(e) => {
                    setIsOptions(isOptions ? false : true);
                  }}
                />
                <div
                  id="center-bottom"
                  style={{
                    backgroundColor: "#2a273d",
                    height: "max-content",
                    width: "150px",
                    display: isOptions ? "block" : "none",
                  }}
                  className="rounded-2 p-1 "
                >
                  <Button
                    size="sm"
                    className="options-left-sidebar-button danger-button"
                    onClick={Logout}
                  >
                    <BiLogOut size={20} className="me-2" />
                    Sign out
                  </Button>
                </div>
              </div>
              <div>
                <Link to="/home" className="center-flex">
                  <Button className="sidebar-button-rounded">
                    <BiHome size={25} />
                  </Button>
                </Link>
              </div>
              <div>
                <div className="center-flex">
                  <Button className="sidebar-button-rounded">
                    <MdOutlineNotificationsNone size={25} />
                  </Button>
                </div>
              </div>
              <div>
                <div className="center-flex">
                  <Button className="sidebar-button-rounded">
                    <IoChatbubblesOutline size={25} />
                  </Button>
                </div>
              </div>

              <div>
                <div className="center-flex">
                  <Button className="sidebar-button-rounded">
                    <MdOutlineExplore size={25} />
                  </Button>
                </div>
              </div>
              <div>
                <Link to="/profile" className="center-flex pb-2">
                  <Button className="sidebar-button-rounded">
                    <CgProfile size={25} />
                  </Button>
                </Link>
              </div>
              <hr className="text-light mx-2 me-2" />
              <div>
                <Link to="/settings" className="center-flex pb-2">
                  <Button className="sidebar-button-rounded">
                    <FiSettings size={25} />
                  </Button>
                </Link>
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  className="gradient-button center-flex"
                  onClick={() => setModalShow(true)}
                >
                  <MdOutlineEdit size={25} />
                </Button>
              </div>
            </div>
            <div className="w-100 h-100" id="left-sidebar-content-xl">
              <div className="d-flex flex-column justify-content-center align-items-center position-relative">
                <img
                  id="pfp-left-sidebar"
                  src={LoggedInUser?.pfp}
                  onClick={(e) => {
                    setIsOptions(isOptions ? false : true);
                  }}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    width: "150px",
                    height: "150px",
                  }}
                />
                <div
                  id="center-bottom"
                  style={{
                    backgroundColor: "#2a273d",
                    height: "max-content",
                    width: "150px",
                    display: isOptions ? "block" : "none",
                  }}
                  className="rounded-2 p-1 "
                >
                  <Button
                    size="sm"
                    className="options-left-sidebar-button danger-button"
                    onClick={Logout}
                  >
                    <BiLogOut size={20} className="me-2" />
                    Sign out
                  </Button>
                </div>
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
                    <span>Explore</span>
                  </Button>
                </div>
              </div>
              <div>
                <Link to="/profile" className="sidebar-button-div ">
                  <Button className="sidebar-button">
                    <span>Profile</span>
                  </Button>
                </Link>
              </div>
              <hr className="text-light mx-2 me-2" />
              <div>
                <Link to="/settings" className="sidebar-button-div mb-2">
                  <Button className="sidebar-button">
                    <span>Settings</span>
                  </Button>
                </Link>
              </div>

              <div className="center-flex">
                <Button
                  className="gradient-button center-flex w-75 rounded-5"
                  onClick={() => setModalShow(true)}
                >
                  <span className="d-flex align-items-center mx-1">
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
