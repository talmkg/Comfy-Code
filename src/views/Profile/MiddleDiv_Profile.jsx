import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { MdCalendarToday, MdOutlineCake } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/Middle_Feed&Nav/Post";
import Big_Follow_Button from "../../components/Mini_Components/Big_Follow_Button";
import Follow_Button from "../../components/Mini_Components/Follow_Button";
import User_Card from "../../components/Mini_Components/User_Card";

import {
  fetchLoginnedUser,
  fetchMyGroups,
  fetchSomeonesGroups,
  fetchUsersGroups,
  fetchUsersPosts,
} from "../../redux/actions";
import { getTokenFromStore } from "../../redux/store";
import "./styles.css";
const MiddleDiv_Profile = (userProps) => {
  const loading = useSelector((state) => state.loading);
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);

  const [usersGroups, setUsersGroups] = useState([]);
  const dispatch = useDispatch();
  const user = userProps;
  const myGroups = useSelector((state) => state?.usersGroups);
  const params = useParams();

  //posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //if another or myself
    if (params.userId) {
      dispatch(fetchSomeonesGroups(params.userId, setUsersGroups));
      dispatch(fetchUsersPosts(params.userId, setPosts));
    } else {
      dispatch(fetchLoginnedUser());
      dispatch(fetchUsersGroups());
      dispatch(fetchUsersPosts(LoggedInUser._id, setPosts));
    }
  }, []);

  let objectDate = new Date(user.createdAt);
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();
  useEffect(() => {
    console.log(posts);
  }, []);
  return (
    <>
      <div
        className="flex-fill text-color"
        style={{
          maxWidth: "65vw",
          width: "100%",
          backgroundColor: "#191724",
        }}
      >
        <img
          src={user?.background}
          style={{
            zIndex: "0",
            position: "fixed",
            right: 0,
            left: 0,
            opacity: "0.2",
            height: "100%",
            width: "100vw",
          }}
        />
        <div
          className=" w-100 h-100 pt-4 position-relative"
          style={{ backdropFilter: "blur(4px)" }}
        >
          {loading ? (
            <div id="center" style={{ zIndex: "99" }}>
              <Spinner className="text-light" />
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex justify-content-center">
            <div className="glass w-75" style={{ height: "60vh" }}>
              <div
                className="rounded-top position-relative "
                style={{
                  height: "40%",
                  backgroundImage: `linear-gradient(0deg, rgba(25,25,41,0.8) 50%, rgba(255,255,255,0) 100%), url(${user?.background})`,

                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="mx-4 d-flex align-items-center"
                  style={{ position: "absolute", bottom: "-10%" }}
                >
                  <img
                    src={user?.pfp}
                    style={{
                      width: "170px",
                      aspectRatio: 1 / 1,
                      objectFit: "cover",
                    }}
                    className="rounded-circle me-3"
                  />
                  <div className="text-light">
                    <div style={{ fontSize: "20px" }}>
                      {user?.name} {user?.surname}
                    </div>
                    <div className="text-light" style={{ fontSize: "18px" }}>
                      @{user?.username}
                    </div>
                  </div>
                </div>
                {params.userId ? (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "50px",
                    }}
                  >
                    <Big_Follow_Button id={user._id} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className="position-relative"
                style={{
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.192)",
                  height: "25%",
                }}
              >
                {user.bio ? (
                  <div
                    className="p-3 center-flex h-100 w-100 "
                    style={{ fontSize: "16px" }}
                  >
                    {user.bio}
                  </div>
                ) : (
                  "Nothing here... yet."
                )}
              </div>
              <div
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.192)",
                  height: "15%",
                }}
              >
                <Row className="h-100">
                  <Col xs={6} className="center-flex">
                    <MdOutlineCake size={18} className="me-1" />
                    Birthday: {user?.birthday ? user.birthday : "No data"}
                  </Col>
                  <Col xs={6} className="center-flex">
                    <MdCalendarToday size={18} className="me-1" />
                    Joined on:{" "}
                    {objectDate ? day + "/" + month + "/" + year : "No data"}
                  </Col>
                </Row>
              </div>
              <div className="" style={{ height: "20%" }}>
                <Row className="h-100 g-0">
                  <Col xs={12} lg={3} className="center-flex text-color">
                    <div>
                      <div className="text-center">
                        Member of {myGroups?.memberOf?.length} group('s)
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} lg={3} className="center-flex text-color">
                    <div>
                      <div className="text-center"></div>Leader of{" "}
                      {myGroups.leaderOf?.length} group('s)
                    </div>
                  </Col>
                  <Col xs={12} lg={3} className="center-flex text-color">
                    <div>
                      <div className="text-center"></div>
                      {user.follows?.length} Following<div></div>
                    </div>
                  </Col>
                  <Col xs={12} lg={3} className="center-flex text-color">
                    <div>
                      <div className="text-center"></div>
                      {user.followers?.length} Followers<div></div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {/* style={{ maxHeight: "100%", overflow: "hidden" }} */}
          <div
            className="d-flex justify-content-center"
            style={{ maxHeight: "100%", minHeight: "35vh", overflow: "hidden" }}
          >
            <div className="d-flex justify-content-center pt-3 pb-3 w-100">
              <div className="w-75 d-flex justify-content-center">
                <div
                  className=" glass p-3 g-0 scrollbar w-100"
                  style={{
                    overflow: "hidden visible",
                  }}
                >
                  <div
                    className="w-100 rounded-5 d-flex justify-content-between"
                    style={{
                      height: "60px",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#1F1D2D",
                    }}
                  >
                    <div style={{ width: "33%" }} className="center-flex">
                      <Button className="sidebar-button w-75 h-75">
                        <span>Posts</span>
                      </Button>
                    </div>
                    <div style={{ width: "33%" }} className="center-flex">
                      <Button className="sidebar-button w-75 h-75">
                        <span>Groups</span>
                      </Button>
                    </div>
                    <div style={{ width: "33%" }} className="center-flex">
                      <Button className="sidebar-button w-75 h-75">
                        <span>About Me</span>
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center pt-4">
                    {posts.map((post, i) => {
                      return (
                        <div
                          key={i}
                          className="rounded-2 p-2"
                          style={{
                            backgroundColor: "#232133",
                            height: "max-content",
                            width: "100%",
                          }}
                        >
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
                          <div> {post.text}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MiddleDiv_Profile;
