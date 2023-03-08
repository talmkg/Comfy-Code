import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { MdCalendarToday, MdOutlineCake } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Group from "../../components/Middle_Feed&Nav/Group";
import Post from "../../components/Middle_Feed&Nav/Post";
import Big_Follow_Button from "../../components/Mini_Components/Big_Follow_Button";
import Follow_Button from "../../components/Mini_Components/Follow_Button";
import User_Card from "../../components/Mini_Components/User_Card";

import {
  fetchLoginnedUser,
  fetchMyGroups,
  fetchSomeonesGroups,
  fetchUserById,
  fetchUsersGroups,
  fetchUsersPosts,
} from "../../redux/actions";
import { getTokenFromStore } from "../../redux/store";
import "./styles.css";
const MiddleDiv_Profile = () => {
  const loading = useSelector((state) => state.main.loading);
  const LoggedInUser = useSelector((state) => state.main.LoggedInUser[0]);
  const usersPosts = useSelector((state) => state.main.usersPosts);

  const [usersGroups, setUsersGroups] = useState([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  // const myGroups = useSelector((state) => state?.usersGroups);
  const paramsData = useParams();
  const [params, setParams] = useState(paramsData);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (paramsData.id) {
      dispatch(fetchUserById(paramsData.id, setUser));
      dispatch(fetchUsersPosts(paramsData.id, setPosts));
    } else {
      setUser(LoggedInUser);
      //we are changing it
      dispatch(fetchUsersPosts(LoggedInUser._id, setPosts));
    }
  }, [paramsData]);

  let objectDate = new Date(user.createdAt);
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();

  return (
    <>
      <div
        className="flex-fill text-color"
        style={{
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
        <div className=" w-100 h-100 pt-4 position-relative">
          {loading ? (
            <div id="center" style={{ zIndex: "99" }}>
              <Spinner className="text-light" />
            </div>
          ) : (
            <></>
          )}
          <div className="d-flex justify-content-center">
            <div className="glass" style={{ height: "60vh", width: "950px" }}>
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
                  className="mx-3 d-flex align-items-center"
                  style={{ position: "absolute", bottom: "-10%" }}
                >
                  <img
                    src={user?.pfp}
                    style={{
                      aspectRatio: 1 / 1,
                      width: "25%",
                      objectFit: "cover",
                    }}
                    className="rounded-circle me-2"
                  />
                  <div className="text-light">
                    <div style={{ fontSize: "18px" }}>
                      {user?.name} {user?.surname}
                    </div>
                    <div className="text-color" style={{ fontSize: "17px" }}>
                      @{user?.username}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="position-relative "
                style={{
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.192)",

                  height: "25%",
                }}
              >
                {user.bio ? (
                  <div
                    className="h-100 w-100 center-flex "
                    style={{ fontSize: "16px" }}
                  >
                    {user.bio}
                  </div>
                ) : (
                  <div
                    className="h-100 w-100 center-flex text-muted "
                    style={{ fontSize: "16px" }}
                  >
                    This user has not written their bio yet.
                  </div>
                )}
                {params.userId ? (
                  <div
                    className="p-2"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <Big_Follow_Button id={user._id} />
                  </div>
                ) : (
                  <></>
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
                  <Col xs={4} className="center-flex text-color">
                    <div className="w-100">
                      <div className="w-100 text-center">
                        {posts?.length} post('s)
                      </div>
                    </div>
                  </Col>

                  <Col xs={4} className="center-flex text-color">
                    <div>
                      <div className="text-center"></div>
                      {user.follows?.length} Following<div></div>
                    </div>
                  </Col>
                  <Col xs={4} className="center-flex text-color">
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
            <div className="d-flex justify-content-center pt-3 w-100">
              <div
                className=" d-flex justify-content-center"
                style={{ width: "950px" }}
              >
                <div
                  className=" glass p-3 g-0 scrollbar w-100"
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="w-100 rounded-3 d-flex justify-content-between"
                    style={{
                      height: "60px",
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#1F1D2D",
                    }}
                  >
                    <div style={{ width: "33%" }} className="center-flex">
                      <Button className="sidebar-button w-75 h-75">
                        <span>All</span>
                      </Button>
                    </div>
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
                  </div>
                  <div>
                    {paramsData.id
                      ? posts.map((post, i) => {
                          return (
                            <Post key={i} {...post} i={i} width={"100%"} />
                          );
                        })
                      : usersPosts.map((post, i) => {
                          return (
                            <Post key={i} {...post} i={i} width={"100%"} />
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
