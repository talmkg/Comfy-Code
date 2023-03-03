import { Dropdown, Navbar } from "react-bootstrap";
import { IoEarthSharp, IoPeople } from "react-icons/io5";

const GlobalTopNav = () => {
  return (
    <div
      className="w-100 text-light sticky-top"
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
