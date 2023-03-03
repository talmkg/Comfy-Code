import { Badge, Button, Col, Row } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { BsLock } from "react-icons/bs";
import { FiLock, FiUnlock } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./styles.css";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BiBadge } from "react-icons/bi";
import { useEffect, useState } from "react";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import { useSelector } from "react-redux";
import Badges from "./Badges/Badges";
const Settings = () => {
  const [currentWindow, setCurrentWindow] = useState();
  const [prev, setPrevious] = useState();
  useEffect(() => {
    changeWindow(<ProfileSettings />, "profile");
  }, []);

  const changeWindow = (page_element, current_button) => {
    setPrevious(current_button);
    setCurrentWindow(page_element);
    const elem = document.getElementById(`${current_button}`);
    console.log("id found", elem);
    if (prev) {
      const elem_prev = document.getElementById(`${prev}`);
      elem_prev.classList.remove("active-side-settings-button");
    }
    elem.classList.add("active-side-settings-button");
  };
  return (
    <>
      <div
        className="flex-fill text-light overflow-hidden"
        style={{
          maxWidth: "65vw",
          width: "65vw",
          backgroundColor: "#191724",
        }}
      >
        <div className="w-100 h-100 d-flex justify-content-center mt-4">
          <div className="w-75 h-100 rounded-top">
            <Row className="w-100 h-100 g-0 position-relative ">
              <Col xs={4} className=" rounded-top flex-column p-2">
                <Button
                  className="side-settings-button w-100 pt-2 pb-2 mb-2 d-flex justify-content-start"
                  id="profile"
                  onClick={(e) => {
                    changeWindow(<ProfileSettings />, "profile");
                  }}
                >
                  <span className="me-3">
                    <AiOutlineUser size={22} />
                  </span>
                  Profile
                </Button>
                <Button
                  className="side-settings-button w-100 pt-2 pb-2 mb-2 d-flex justify-content-start"
                  id="badges"
                  onClick={(e) => {
                    changeWindow(<Badges />, "badges");
                  }}
                >
                  <span className="me-3">
                    <BiBadge size={22} />
                  </span>
                  Badges
                </Button>
                <Button className="side-settings-button w-100 pt-2 pb-2 mb-2 d-flex justify-content-start">
                  <span className="me-3">
                    <FiUnlock size={22} />
                  </span>
                  Privacy
                </Button>
                <Button className="side-settings-button w-100 pt-2 pb-2 mb-2 d-flex justify-content-start">
                  <span className="me-3">
                    <MdOutlineNotificationsNone size={22} />
                  </span>
                  Notifications
                </Button>

                <Button className="side-settings-button w-100 pt-2 pb-2 mb-2 d-flex justify-content-start">
                  <span className="me-3">
                    <FiLock size={22} />
                  </span>
                  Security
                </Button>
              </Col>
              <Col xs={8} className="p-2 h-100">
                {currentWindow}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
export default Settings;
