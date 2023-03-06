import Post from "./Post";
import { IoEarthSharp, IoPeople } from "react-icons/io5";
import { Navbar, Row, Col, Dropdown, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchLoginnedUser, getFeed, getGroups } from "../../redux/actions";
import { useDispatch } from "react-redux";
import GlobalTopNav from "../GlobalTopNav/GlobalTopNav";
import { Link } from "react-router-dom";
import { MdMoreHoriz, MdRepeat } from "react-icons/md";
import { FiRepeat } from "react-icons/fi";
import { RiRepeatLine, RiReplyAllLine } from "react-icons/ri";
import { BsReply } from "react-icons/bs";
import { VscReactions } from "react-icons/vsc";

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
const MiddleDiv = () => {
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  console.log(feed);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    // dispatch(fetchLoginnedUser());
    dispatch(getFeed(10));
  }, []);

  return (
    <>
      <div
        className="flex-fill"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          backgroundColor: "#191724",
          // overflow: "hidden",
        }}
      >
        <div className="h-100">
          <GlobalTopNav />
          <div
            className="position-relative pb-3"
            style={{ overflow: "hidden" }}
          >
            {loading ? (
              <div id="center" style={{ zIndex: "99" }}>
                <Spinner className="text-light" />
              </div>
            ) : (
              <></>
            )}
            <Row>
              {feed?.map((post, i) => {
                return (
                  <>
                    {post.type === "Group" ? (
                      <Col
                        xs={12}
                        key={i}
                        className="pe-4 px-4 pb-1 pt-1 d-flex justify-content-center"
                      >
                        <Post key={i} {...post} />
                      </Col>
                    ) : (
                      <Col
                        xs={12}
                        key={i}
                        className="pe-4 px-4 pb-1 pt-1 d-flex justify-content-center"
                      >
                        <div
                          key={i}
                          className="rounded-2 mt-2 mb-2"
                          style={{
                            backgroundColor: "#232133",
                            height: "max-content",
                            width: "700px",
                          }}
                        >
                          <div className="d-flex justify-content-between p-3">
                            <div className="d-flex align-items-center">
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
                                {new Date(post.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </span>
                          </div>
                          <div className="text-color pe-3 px-3">
                            {post.text}
                          </div>
                          <div className="center-flex flex-fill h-75 w-100">
                            {post.images ? (
                              post.images.map((image) => {
                                return (
                                  <img
                                    src={image}
                                    className=" w-50 pb-2"
                                    style={{
                                      height: "max-content",
                                      objectFit: "cover",
                                    }}
                                  />
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </div>
                          <div
                            className="w-100 rounded-bottom p-3 d-flex justify-content-start align-items-center text-color"
                            style={{ height: "60px" }}
                          >
                            <BsReply className="h-100 me-3" size={25} />
                            <MdRepeat className="h-100 me-3" size={25} />
                            <VscReactions className="h-100 me-3" size={25} />
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
                    )}
                  </>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiddleDiv;
