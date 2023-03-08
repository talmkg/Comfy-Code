import { Dropdown, Navbar } from "react-bootstrap";
import { IoEarthSharp, IoPeople } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import "./styles.css";
const GlobalTopNav = (data) => {
  const identifier = data.identifier;
  if (identifier === "home") {
    return (
      <div
        className="w-100 text-light sticky-top"
        style={{
          position: "sticky",
          top: "0",
          right: "0",
          left: "0",
          zIndex: 1,
        }}
      >
        <Navbar
          id="navbar"
          style={{
            height: "5.5vh",
          }}
          className="d-flex justify-content-between p-1 w-100"
        >
          <div className="d-flex align-items-center h-100">
            <div className=" mx-3 d-flex align-items-center rounded-2 h-100 p-2">
              <IoEarthSharp size={22} className="me-1" />
              Global
            </div>
            <div className="h-100 d-flex align-items-center me-3 border-bottom">
              <IoEarthSharp size={22} />
            </div>
            <div className="h-100 d-flex align-items-center me-3 text-color">
              <IoPeople size={22} />
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
    );
  }
  if (identifier === "notifications") {
    return (
      <div
        className="w-100 text-light sticky-top"
        style={{
          position: "sticky",
          top: "0",
          right: "0",
          left: "0",
          zIndex: 1,
        }}
      >
        <Navbar
          id="navbar"
          style={{
            height: "5.5vh",
          }}
          className="d-flex justify-content-between p-1 w-100"
        >
          <div className="d-flex align-items-center h-100">
            <div className=" mx-3 d-flex align-items-center rounded-2 h-100 p-2">
              <MdOutlineNotificationsNone size={22} className="me-1" />
              Notifications
            </div>
            <div className="h-100 d-flex align-items-center me-3 border-bottom">
              <MdOutlineNotificationsNone className="me-1" size={22} /> All
            </div>
            <div className="h-100 d-flex align-items-center me-3 text-color">
              <FaUsers className="me-1" size={22} /> Groups
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
    );
  }
};
export default GlobalTopNav;
