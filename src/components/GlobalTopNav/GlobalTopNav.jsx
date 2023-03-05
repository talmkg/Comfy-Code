import { Dropdown, Navbar } from "react-bootstrap";
import { IoEarthSharp, IoPeople } from "react-icons/io5";
import "./styles.css";
const GlobalTopNav = () => {
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
          height: "6vh",
        }}
        className="d-flex justify-content-between p-1 h-100 w-100"
      >
        <div className="d-flex align-items-center h-100">
          <div
            className=" mx-3 d-flex align-items-center rounded-2 h-100 p-2"
            style={{ backgroundColor: "#322E4F" }}
          >
            <IoEarthSharp size={22} className="me-1" />
            Global
          </div>
          <div className="h-100 d-flex align-items-center me-3">
            <IoEarthSharp size={22} />
          </div>
          <div className="h-100 d-flex align-items-center me-3">
            <IoPeople size={22} />
          </div>
        </div>

        <div className="me-3">
          <Dropdown id="dropdown-navbar">
            <Dropdown.Toggle className="bg-light-color">Latest</Dropdown.Toggle>

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
};
export default GlobalTopNav;
