import React from "react";
import { Col, Dropdown } from "react-bootstrap";
import { HiOutlineReply } from "react-icons/hi";
import { MdMoreHoriz, MdRepeat } from "react-icons/md";
import { VscReactions } from "react-icons/vsc";
import { IoRepeat } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Reply from "./Reply";
import { useState } from "react";
import PostsMiniProfile from "./PostsMiniProfile";
import MiniProfileTemplate from "./MiniProfileTemplate";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <MdMoreHoriz size={30} id="post-options" />
  </a>
));

function Post(post) {
  const LoggedInUser = useSelector((state) => state.main.LoggedInUser[0]);
  const [modalShow, setModalShow] = useState(false);
  return (
    <Col
      xs={12}
      key={post.i}
      className={
        post.width === "100%"
          ? `pb-1 pt-1 d-flex justify-content-center`
          : `pe-4 px-4 pb-1 pt-1 d-flex justify-content-center`
      }
    >
      <div
        className="rounded-2 mt-2 mb-2"
        style={{
          backgroundColor: "#232133",
          height: "max-content",
          width: post.width ? post.width : "700px",
        }}
      >
        <div className="d-flex justify-content-between p-3">
          <div
            className="d-flex align-items-center position-relative"
            id="profile-picture-post"
          >
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
            <div
              className="position-absolute"
              style={{ left: "50%", top: "0%" }}
            >
              <MiniProfileTemplate {...post.creator} />
            </div>
            <div className="text-color">
              <Link
                to={`/profile/${post.creator._id}`}
                className="text-light"
                style={{ textDecoration: "none" }}
              >
                <h6 className="p-0 m-0">
                  {post.creator.name} {post.creator.surname}
                </h6>
              </Link>
              @{post.creator.username}
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
        <div className="text-color pe-3 px-3 text">{post.text}</div>
        <div className="pe-3 px-3">
          <div
            className={
              post.images[0]
                ? "center-flex flex-fill w-100  mb-2 mt-2 rounded-3"
                : "d-none"
            }
            style={{
              height: "400px",
              backgroundColor: "#191724",
              overflow: "hidden",
            }}
          >
            {post.images ? (
              post.images.map((image, i) => {
                return (
                  <img
                    key={i}
                    src={image}
                    className=""
                    style={{
                      height: "100%",
                      width: "max-content",
                      objectFit: "cover",
                    }}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="w-100 rounded-bottom p-3 d-flex justify-content-start align-items-center"
          style={{ height: "60px" }}
        >
          <HiOutlineReply
            className="h-100 me-3 post-icons"
            size={22}
            onClick={(e) => {
              setModalShow(true);
            }}
          />
          <IoRepeat className="h-100 me-3 post-icons" size={27} />
          <VscReactions className="h-100 me-3 post-icons" size={27} />

          <Reply
            show={modalShow}
            props={post}
            onHide={() => setModalShow(false)}
          />
          <span>
            <div className="d-flex justify-content-end text-color">
              <Dropdown>
                <Dropdown.Toggle
                  className="text-color"
                  as={CustomToggle}
                  id="dropdown-custom-components"
                ></Dropdown.Toggle>
                <Dropdown.Menu id="dropdown-window">
                  {post.creator._id === LoggedInUser?._id ? (
                    <>
                      <Dropdown.Item
                        className="text-light dropdown-buttons"
                        eventKey="1"
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-light dropdown-buttons"
                        eventKey="2"
                      >
                        Delete
                      </Dropdown.Item>

                      <Dropdown.Item
                        className="text-light dropdown-buttons"
                        eventKey="1"
                      >
                        Share
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item
                        className="text-light dropdown-buttons"
                        eventKey="1"
                      >
                        Share
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </span>
        </div>
      </div>
    </Col>
  );
}

export default Post;
