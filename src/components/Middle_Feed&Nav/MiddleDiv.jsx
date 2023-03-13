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
import ReactDOM from "react-dom";
import $ from "jquery";

import Group from "./Group";
import Post from "./Post";

const MiddleDiv = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.main.feed);
  const loading = useSelector((state) => state.main.loading);
  let number = 10;
  // useEffect(() => {
  //   dispatch(getFeed(number));
  // }, []);

  // $(window).on("scroll", function () {
  //   if (
  //     $(window).scrollTop() >=
  //     $(".feed-div").offset().top +
  //       $(".feed-div").outerHeight() -
  //       window.innerHeight
  //   ) {
  //     dispatch(getFeed(number + 10));
  //   }
  // });

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
          <GlobalTopNav identifier={"home"} />
          <div
            className="position-relative pb-3 feed-div"
            style={{ overflow: "hidden" }}
          >
            {/* {loading ? (
              <div id="center" style={{ zIndex: "99" }}>
                <Spinner className="text-light" />
              </div>
            ) : (
              <></>
            )} */}
            <Row className="">
              {feed?.map((post, i) => {
                return (
                  <div key={i}>
                    {post.type === "Group" ? (
                      <Col
                        xs={12}
                        className="pe-4 px-4 pb-1 pt-1 d-flex justify-content-center"
                      >
                        <Group key={i} {...post} />
                      </Col>
                    ) : (
                      //create component
                      <Post {...post} i={i} />
                    )}
                  </div>
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
