import Post from "./Post";
import { IoEarthSharp, IoPeople } from "react-icons/io5";
import { Navbar, Row, Col, Dropdown, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchLoginnedUser, getGroups } from "../../redux/actions";
import { useDispatch } from "react-redux";
import GlobalTopNav from "../GlobalTopNav/GlobalTopNav";
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
          // minHeight: "150vh",
          background: "transparent",
          backgroundColor: "#191724",
          //added this
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
