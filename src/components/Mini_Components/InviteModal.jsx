import { Button, Modal, InputGroup, Form, Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import { AiOutlineQuestionCircle, AiOutlinePlus } from "react-icons/ai";

import "../Left_Sidebar/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { inviteToGroup } from "../../redux/actions";
import { BsSearch } from "react-icons/bs";
import { useEffect } from "react";

function UsersModal(props) {
  const { onHide, id } = props;
  const dispatch = useDispatch();
  const [invitedUser, setInvitedUser] = useState("");
  const LoggedInUser = useSelector((state) => state?.main.LoggedInUser[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [follows, setFollows] = useState(LoggedInUser.follows);
  useEffect(() => {
    update();
  }, [searchQuery]);
  const update = () => {
    if (searchQuery.length === 0) {
      setFollows(LoggedInUser.follows);
    } else {
      const filtered = follows.filter((user) =>
        user.name.toLowerCase().startsWith(searchQuery)
      );
      setFollows(filtered);
    }
  };
  return (
    <Modal
      id="no-border-box"
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="text-light"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="p-2">
        <button
          type="button"
          className="btn-close btn-close-white m-0"
          aria-label="Close"
          onClick={onHide}
        ></button>
        <div>
          <h5 className="text-center text-color">Invite your friends</h5>
          <Form.Group className="mb-3">
            <Form.Control
              type="Title"
              className="bg-transparent"
              style={{ border: "none" }}
              placeholder={`Enter the name or username of your friend`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
          <div
            className="rounded-3 w-100"
            style={{ background: "#373249", padding: "0.5rem" }}
          >
            {LoggedInUser?.follows[0] ? (
              follows.map((user, index) => {
                const invite_action = () => {
                  dispatch(inviteToGroup(id, user._id));
                  setInvitedUser(user.name + " " + user.surname);
                };

                return (
                  <div
                    key={index}
                    className="pb-2 pt-2 pe-1 px-1 d-flex justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={user.pfp}
                        style={{
                          maxHeight: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <span className="p-0 m-0">
                        {user.name} {user.surname}
                      </span>
                    </div>

                    <div>
                      <Button
                        className="gradient-button d-flex align-items-center justify-content-center rounded-1"
                        style={{
                          width: "max-content",
                          height: "max-content",
                        }}
                        onClick={invite_action}
                      >
                        <span className="me-1"> Invite</span>
                        <AiOutlinePlus />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-color">
                You have no friends yet
              </div>
            )}
          </div>
          {invitedUser ? (
            <div className="text-center text-success pt-4">
              You invited {invitedUser}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
}
export default UsersModal;
