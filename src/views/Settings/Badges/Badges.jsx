import { useDispatch, useSelector } from "react-redux";
import React from "react";

import { useState } from "react";
import codeIcon from "../../../Files/Badges/code.png";
import javascriptIcon from "../../../Files/Badges/javascript.png";
import pythonIcon from "../../../Files/Badges/python.png";
import learningIcon from "../../../Files/Badges/learning.png";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchBadges } from "../../../redux/actions";
import MiniProfilePreview from "./MiniProfilePreview";
import "./styles.css";
const Badges = () => {
  //get badges
  const [selectedBadges, setSelectedBadges] = useState([]);
  const dispatch = useDispatch();
  const badges = useSelector((state) => state.badges);
  const user = useSelector((state) => state.LoggedInUser[0]);
  useEffect(() => {
    dispatch(fetchBadges());
  }, []);
  const addBadge = (e) => {
    const alreadyExists = selectedBadges.filter((badge) => badge._id === e._id);
    if (alreadyExists.length !== 0) {
      const filtered = selectedBadges.filter((badge) => badge._id !== e._id);
      setSelectedBadges([...filtered]);
    } else {
      setSelectedBadges([...selectedBadges, e]);
    }
  };
  return (
    <div className="w-100">
      <div className="text-color">
        <h4>Featured Badges</h4>
        <span>Choose a badge to feature at your Profile and Mini-Profile.</span>
        <div className="w-100 center-flex pt-4">
          <div className="w-50">
            <MiniProfilePreview {...user} badges={selectedBadges} />
          </div>
        </div>
        <div className="p-5">
          <Row
            className="row-cols-3 w-100 p-2 rounded g-2"
            style={{ backgroundColor: "#1F1D2D" }}
          >
            {badges.map((badge, i) => {
              const alreadyExists = selectedBadges.filter(
                (d) => d._id === badge._id
              );

              return (
                <Col
                  key={i}
                  className="d-flex justify-content-start   p-2"
                  onClick={(e) => addBadge(badge)} //then we will populate it in profile, and it will be visible.
                >
                  <div
                    className="p-1 d-flex align-items-center w-100 h-100"
                    style={{
                      backgroundColor:
                        alreadyExists.length > 0 ? "#2A273D" : "",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={badge.icon}
                      className="me-1"
                      style={{ width: "50px", height: "50px" }}
                    />

                    <span className="text-truncate">{badge.title}</span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Badges;
