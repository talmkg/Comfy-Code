import {
  Button,
  Modal,
  InputGroup,
  Form,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { FaRegPaperPlane, FaUpload } from "react-icons/fa";

import { useEffect, useState } from "react";

import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

import "./styles.css";
import { useDispatch } from "react-redux";
import {
  createGroup,
  createPost,
  getHashtags,
  LOGIN,
  TOKEN,
} from "../../redux/actions";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

function Reply(props) {
  const dispatch = useDispatch();
  const [postImage, setPostImage] = useState(undefined);
  const [postType, setPostType] = useState(true);
  const [postText, setPostText] = useState("");
  const [postPreview, setPostPreview] = useState(undefined);
  const [isImagePreviewOptionOn, setIsImagePreviewOptionOn] = useState(false);
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
  const post = props.props;
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
            ></button>
            <Button
              className="btn gradient-button d-flex align-items-center justify-content-around"
              style={{ borderRadius: "15px" }}
            >
              <span className="d-flex align-items-center me-1">Reply</span>
              <span className="d-flex align-items-center">
                <FaRegPaperPlane />
              </span>
            </Button>
          </div>
          <>
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-items-start">
                <img
                  src={post.creator.pfp}
                  className="me-2"
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />

                <div className="text-color">
                  <Link
                    to={`/profile/${post.creator._id}`}
                    className="text-light d-flex align-items-star"
                    style={{ textDecoration: "none" }}
                  >
                    <h6 className="p-0 m-0 me-2">
                      {post.creator.name} {post.creator.surname}
                    </h6>
                    <span className="small text-color">
                      @{post.creator.username}
                    </span>
                  </Link>
                  <div>{post.text}</div>
                </div>
              </div>

              <span>
                <div className="text-muted">
                  {new Date(post.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </span>
            </div>
            <div className="w-100"></div>
            <div className="post-post w-100 h-100 d-flex flex-column justify-content-between">
              <div>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    className="bg-transparent"
                    style={{ border: "none" }}
                    placeholder="Reply to this post..."
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
                <div className="d-flex justify-content-between align-items-center text-color pe-3 px-3 pb-3 pt-2">
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
        </div>
      </Modal>
    </>
  );
}
export default Reply;
