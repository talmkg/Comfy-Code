import { Card, Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import PostsMiniProfile from "./PostsMiniProfile";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../../redux/actions";
import { Link } from "react-router-dom";

<PostModal />;
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <MdMoreHoriz size={30} id="post-options" />
  </a>
));

const Post = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  const dispatch = useDispatch();
  const {
    name,
    surname,
    leader,
    title,
    description,
    imageUrl,
    createdAt,
    updatedAt,
    team,
    _id,
    width,
  } = props;
  let alreadyInGroup = false;
  if (team.filter((e) => e._id === LoggedInUser?._id).length > 0) {
    alreadyInGroup = true;
  }
  const deleteGroupAction = () => {
    dispatch(deleteGroup(_id));
  };
  return (
    <>
      <Card
        className="text-light mt-3 mb-3 glass-card"
        style={{
          maxWidth: width ? width : "50%",
          width: "100%",
          cursor: "pointer",
        }}
      >
        <Card.Body className="pb-5">
          <div className="d-flex align-items-center">
            <img
              src={leader[0]?.pfp}
              style={{
                height: "50px",
                width: "50px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              className="me-2"
            />

            <div className="w-100">
              <div className="d-flex justify-content-between">
                <div className="text-color">
                  <Link
                    to={`/profile/${leader[0]?._id}`}
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    <h6 className="p-0 m-0">
                      {leader[0]?.name} {leader[0]?.surname}
                    </h6>
                  </Link>
                  @{leader[0]?.username}
                </div>
                <span>
                  <div className="d-flex justify-content-end">
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{ color: "white" }}
                        as={CustomToggle}
                        id="dropdown-custom-components"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu id="dropdown-window">
                        {leader[0]?.username === LoggedInUser?.username ? (
                          <>
                            <Dropdown.Item
                              className="text-light dropdown-buttons"
                              eventKey="1"
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-light dropdown-buttons"
                              eventKey="2"
                              onClick={deleteGroupAction}
                            >
                              Delete
                            </Dropdown.Item>

                            <Dropdown.Item
                              className="text-light dropdown-buttons"
                              eventKey="1"
                            >
                              Share
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Dropdown.Item
                              className="text-light dropdown-buttons"
                              eventKey="1"
                            >
                              Share
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="text-muted">
                    {new Date(createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </span>
              </div>
              <div>
                <h6 className="p-0 m-0" style={{ fontSize: "14px" }}></h6>
              </div>
            </div>
          </div>
          <div>
            <h5 className="m-0 pt-2 pb-2">{title}</h5>
          </div>
          <Card.Text className="text opacity-75">{description}</Card.Text>
          <div
            className="position-absolute p-2 opacity-75"
            style={{
              right: 0,
              bottom: 0,
              color: "#6bc2e5",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {team.length ? team.length : 0}
            /5
          </div>
          <div className="position-absolute d-flex" style={{ bottom: "-10%" }}>
            {team.map((member, i) => {
              return <PostsMiniProfile {...member} key={i} />;
            })}
            {alreadyInGroup ? (
              <div
                onClick={() => setModalShow(true)}
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "65px",
                  height: "65px",
                  border: "2px solid #5b5b5b",
                  borderRadius: "50%",
                  backgroundColor: "#191724",
                }}
                id="join"
              >
                <FaUsers size={30} className="text-color" />
              </div>
            ) : (
              <div
                onClick={() => setModalShow(true)}
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: "65px",
                  height: "65px",
                  border: "2px solid #5b5b5b",
                  borderRadius: "50%",
                  backgroundColor: "#191724",
                }}
                id="join"
              >
                <AiOutlinePlus size={40} style={{ color: "#aaaaaa" }} />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      <PostModal
        show={modalShow}
        props={props}
        onHide={() => setModalShow(false)}
        id={_id}
      />
    </>
  );
};
export default Post;
