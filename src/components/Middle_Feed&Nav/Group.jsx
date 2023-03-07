import { Card, Dropdown, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  AiOutlineExpand,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import PostsMiniProfile from "./PostsMiniProfile";
import PostModal from "./PostModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../../redux/actions";
import { Link } from "react-router-dom";
import CoverView from "./CoverView";
import { BiLockAlt } from "react-icons/bi";

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

const Group = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [imageViewShow, setImageViewShow] = React.useState(false);
  const [isInvited, setIsInvited] = React.useState(false);

  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  const dispatch = useDispatch();
  const {
    leader,
    title,
    description,
    imageUrl,
    createdAt,
    hashtags,
    teamSize,
    language,
    privacySetting,
    invitedUsers,
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
  useEffect(() => {
    if (invitedUsers.includes(LoggedInUser._id)) {
      setIsInvited(true);
    }
  });
  return (
    <>
      <Card
        className="text-light mt-3 mb-4"
        style={{
          maxWidth: width ? width : "700px",
          width: "100%",
          cursor: "pointer",
          backgroundColor: "#232133",
        }}
      >
        <Card.Body className="pb-5 position-relative">
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
          {imageUrl ? (
            <div
              className="w-100 position-relative"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(255,0,0,0) 0%, rgba(25,23,36,1) 100%), url(${imageUrl})`,
                height: "200px",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div
                className="position-absolute p-2  "
                style={{ right: 0, bottom: 0 }}
              >
                <AiOutlineExpand
                  size={25}
                  onClick={() => setImageViewShow(true)}
                />
                <CoverView
                  show={imageViewShow}
                  imageurl={imageUrl}
                  onHide={() => setImageViewShow(false)}
                  id={_id}
                />
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* {imageUrl ? (
              <img
                src={imageUrl}
                className="w-100"
                style={{  }}
              />
            ) : (
              <></>
            )} */}

          <Row
            className="text-color pe-1 px-1"
            style={{ marginTop: imageUrl ? "1rem" : "0rem" }}
          >
            {hashtags?.map((hashtag, index) => {
              return (
                <div
                  key={index}
                  className="rounded-3 p-1 px-2 pe-2 mb-2 mx-1"
                  style={{
                    backgroundColor: "#46395b",
                    cursor: "pointer",
                    width: "max-content",
                  }}
                  id={hashtag._id}
                >
                  {hashtag.title}
                </div>
              );
            })}
          </Row>
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
            {teamSize ? team.length + "/" + teamSize : <></>}
          </div>

          <div
            className="position-absolute d-flex"
            style={{ bottom: imageUrl ? "-6%" : "-10%" }}
            //if we wrap it in one more div, we will have proper parent div
          >
            {team.map((member, i) => {
              return <PostsMiniProfile {...member} i={i} key={i} />;
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
                <FaUsers size={30} className="text-color faUsers" />
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
                {privacySetting === "private" &&
                leader._id !== LoggedInUser._id &&
                isInvited === false ? (
                  <BiLockAlt size={30} style={{ color: "#aaaaaa" }} />
                ) : (
                  <AiOutlinePlus size={30} style={{ color: "#aaaaaa" }} />
                )}
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
export default Group;
