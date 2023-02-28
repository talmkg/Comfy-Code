import Post from "./Post";
import { IoEarthSharp, IoPeople } from "react-icons/io5";
import { Navbar, Row, Col, Dropdown, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchLoginnedUser, getGroups } from "../../redux/actions";
import { useDispatch } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";
const MiddleDiv = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    // dispatch(fetchLoginnedUser());
    dispatch(getGroups());
  }, []);

  return (
    <>
      <div
        className="flex-fill "
        style={{
          maxWidth: "65vw",
          width: "100%",
          minHeight: "100vh",
          background: "transparent",
          backgroundColor: "#191724",
        }}
      >
        {/* <img
          src="https://e0.pxfuel.com/wallpapers/511/547/desktop-wallpaper-dark-anime-background-scenery-stunning-aesthetic-landscape.jpg"
          style={{
            zIndex: "0",
            position: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.4,
            left: 0,
            right: 0,
            height: "100%",
          }}
        /> */}
        <div
          className="h-100 position-relative"
          style={{
            backdropFilter: "blur(5px)",
            overflow: "hidden",
          }}
        >
          <div
            className="w-100 text-light  "
            style={{
              position: "sticky",
              top: "0",
              zIndex: 1,
            }}
          >
            <Navbar
              id="navbar"
              style={{
                height: "6vh",
                padding: 0,
              }}
              className="d-flex justify-content-between"
            >
              <div className="d-flex align-items-center h-100">
                <div
                  className=" mx-3 d-flex align-items-center rounded-2 p-2"
                  style={{ backgroundColor: "#322E4F" }}
                >
                  <IoEarthSharp size={25} className="me-1" />
                  Global
                </div>
                <div
                  className="h-100 d-flex align-items-center me-3"
                  style={{ borderBottom: "3px solid pink" }}
                >
                  <IoEarthSharp size={25} />
                </div>
                <div className="h-100 d-flex align-items-center me-3">
                  <IoPeople size={25} />
                </div>
              </div>

              <div className="me-3">
                <Dropdown id="dropdown-navbar">
                  <Dropdown.Toggle className="bg-light-color">
                    Latest
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="text-light"
                    style={{
                      backgroundColor: "#514c75",
                    }}
                  >
                    <Dropdown.Item
                      href="#"
                      className="text-light"
                      id="dropdown-buttons"
                    >
                      Time
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      className="text-light"
                      id="dropdown-buttons"
                    >
                      Relevance
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Navbar>
          </div>
          <div className="position-relative">
            {loading ? (
              <div id="center" style={{ zIndex: "99" }}>
                <Spinner className="text-light" />
              </div>
            ) : (
              <></>
            )}
            <Row className="mt-4 ">
              {groups?.map((post, i) => {
                return (
                  <Col
                    xs={12}
                    key={i}
                    className="pe-4 px-4 pb-1 pt-1 d-flex justify-content-center"
                  >
                    <Post key={i} {...post} />
                  </Col>
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
