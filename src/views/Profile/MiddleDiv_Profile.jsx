import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { MdCalendarToday, MdOutlineCake } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
  const [usersGroups, setUsersGroups] = useState([]);
  const dispatch = useDispatch();
  const user = userProps;
  const myGroups = useSelector((state) => state?.usersGroups);
  const params = useParams();

  useEffect(() => {
    if (params.userId) {
      dispatch(fetchSomeonesGroups(params.userId, setUsersGroups));
    } else {
      dispatch(fetchLoginnedUser());
      dispatch(fetchUsersGroups());
    }
  }, []);

  let objectDate = new Date(user.createdAt);
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();

  return (
    <>
      <div
        className="flex-fill text-light"
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
            opacity: "0.5",
            height: "100%",
            width: "100vw",
          }}
        />
        <div
          className=" w-100 h-100 pt-4 position-relative"
          style={{ backdropFilter: "blur(3px)" }}
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
                  style={{ position: "absolute", bottom: "-20%" }}
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
                  <div>
                    <div style={{ fontSize: "18px" }}>
                      {user?.name} {user?.surname}
                    </div>
                    <div className="text-color" style={{ fontSize: "16px" }}>
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
                className=" center-flex"
                style={{
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.192)",
                  height: "20%",
                }}
              >
                {user.bio ? user.bio : "Nothing here... yet."}
              </div>
              <div
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.192)",
                  height: "20%",
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
                      <div></div>
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
            style={{ maxHeight: "100%", overflow: "hidden" }}
          >
            <div className="d-flex justify-content-center pt-3 pb-3 w-100">
              <div className="w-75 d-flex justify-content-center">
                <Row
                  className="d-flex justify-content-center glass p-3 g-0 scrollbar w-100"
                  style={{
                    maxHeight: "600px",

                    overflow: "hidden visible",
                  }}
                >
                  {/* <h4 className="text-color">Groups</h4> */}

                  {params.userId ? (
                    <>
                      {usersGroups?.map((post, i) => {
                        return (
                          <Col xs={12} key={i}>
                            <Post {...post} width="100%" />
                          </Col>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {myGroups?.memberOf?.map((post, i) => {
                        return (
                          <Col xs={12} key={i}>
                            <Post {...post} width="100%" />
                          </Col>
                        );
                      })}
                    </>
                  )}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MiddleDiv_Profile;
