import { Card, Row, Col, Modal, Button, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { BiLockAlt, BiUserPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { joinTheGroup, leaveTheGroup } from "../../redux/actions";
import MiniProfileTemplate from "./MiniProfileTemplate";
import UsersModal from "../Mini_Components/InviteModal";
function PostModal(props) {
  const LoggedInUser = useSelector((state) => state.main.LoggedInUser[0]);
  const loading = useSelector((state) => state.main.loading);

  const data = props.props;

  const dispatch = useDispatch();
  const onHide = props.onHide;
  const user_id = LoggedInUser?._id;
  const [usersModalShow, setUsersModalShow] = React.useState(false);
  const [privacyError, setPrivacyError] = React.useState(false);
  const [isInvited, setIsInvited] = useState(false);

  useEffect(() => {
    if (data.invitedUsers.includes(LoggedInUser._id)) {
      setIsInvited(true);
    }
  });

  const joinTheTeamAction = () => {
    dispatch(joinTheGroup(data._id, onHide));
  };
  const leaveTheTeamAction = () => {
    dispatch(leaveTheGroup(data._id, onHide));
  };
  let alreadyInGroup = false;
  if (data?.team.filter((e) => e._id === LoggedInUser?._id).length > 0) {
    alreadyInGroup = true;
  }
  const showErrorMessage = (props) => {
    if (props === "privacy") {
      setPrivacyError(true);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* {loading ? (
          <div id="center">
            <Spinner animation="border" role="status" className="text-light">
              <span className="visually-hidden"></span>
            </Spinner>
          </div>
        ) : (
          <></>
        )} */}
        <div className="text-light p-3">
          <div className="d-flex justify-content-between">
            <Modal.Title id="contained-modal-title-vcenter">
              {data.title}
            </Modal.Title>
            <span className="text-muted">
              Posted at:{" "}
              {new Date(data.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="pt-2">
            <p>{data.description}</p>
          </div>
          <Row className="text-color pe-2 px-2">
            {data?.hashtags?.map((hashtag, i) => {
              return (
                <div
                  key={i}
                  className="rounded-3 p-1 px-2 pe-2 mb-2 mx-1"
                  style={{
                    backgroundColor: "#55466D",
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
          <div>
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                className="w-100
  "
                style={{ aspectRatio: "16/9", objectFit: "cover" }}
              />
            ) : (
              <></>
            )}
          </div>

          {alreadyInGroup ? (
            <>
              <Row className="row-cols-3 justify-content-star p-4">
                {data.team.map((member, i) => {
                  return (
                    <Col className="p-1 position-relative" key={i}>
                      <div className="d-flex  align-items-center ">
                        <div
                          className="w-25 position-relative"
                          id="profile-picture-post"
                        >
                          <img
                            src={member.pfp}
                            style={{
                              border: "2px solid #00d8d5",
                              borderRadius: "50%",
                              width: "90%",
                              height: "90%",
                              objectFit: "cover",
                            }}
                          />
                          <div
                            className="position-absolute"
                            style={{ right: "0%", top: "-50%" }}
                          >
                            <MiniProfileTemplate {...member} />
                          </div>
                        </div>
                        <div className="w-75">
                          <div>
                            {member.name} {member.surname}
                          </div>
                          <div className="text-color">@{member.username}</div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <div className="mt-3 mb-3">
                <h4 className="text-center">Team:</h4>
                <div className="">
                  {data.team?.map((member, i) => {
                    if (member.username === data?.leader[0]?.username) {
                      return (
                        <div key={i} className="p-1 center-flex">
                          <img
                            src={member.pfp}
                            style={{
                              border: "2px solid #FFC0CB",
                              borderRadius: "50%",
                              width: "45px",
                              height: "45px",
                              objectFit: "cover",
                            }}
                            className="me-2"
                          />
                          {member.name} {member.surname}
                        </div>
                      );
                    } else {
                      return (
                        <div className="p-1 center-flex" key={i}>
                          <img
                            src={member.pfp}
                            style={{
                              border: "2px solid #00d8d5",
                              borderRadius: "50%",
                              width: "45px",
                              height: "45px",
                              objectFit: "cover",
                            }}
                            className="me-2"
                          />
                          {member.name} {member.surname}
                        </div>
                      );
                    }
                  })}

                  <div className="d-flex justify-content-center">
                    <div className="center-flex pt-3">
                      {data.privacySetting === "private" &&
                      isInvited === false ? (
                        <>
                          <Button className="btn active-button d-flex align-items-center">
                            <BiLockAlt size={20} />
                            <span>You can't join unless you are invited</span>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="btn active-button d-flex align-items-center"
                            onClick={joinTheTeamAction}
                          >
                            <span>Join</span> <BiUserPlus size={20} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {alreadyInGroup ? (
            <>
              <div className="d-flex justify-content-center pt-2">
                <Button
                  className="btn active-button d-flex align-items-center"
                  onClick={() => setUsersModalShow(true)}
                >
                  <span>
                    Invite <BiUserPlus size={20} />
                  </span>
                </Button>
              </div>
              <div className="d-flex justify-content-between pt-3">
                <div>
                  <Button
                    className="danger-button me-2"
                    onClick={leaveTheTeamAction}
                  >
                    Leave
                  </Button>
                  <Button className="sidebar-button" onClick={props.onHide}>
                    Open Chat
                  </Button>
                </div>
                <Button className="sidebar-button" onClick={props.onHide}>
                  Close
                </Button>
              </div>
              <UsersModal
                id={data._id}
                show={usersModalShow}
                onHide={() => setUsersModalShow(false)}
              />
            </>
          ) : (
            <>
              <div className="d-flex justify-content-end pt-3">
                <Button className="sidebar-button" onClick={props.onHide}>
                  Close
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
export default PostModal;
