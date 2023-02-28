import { Button, Modal, InputGroup, Form, Dropdown } from "react-bootstrap";
import React, { useState } from "react";
import { AiOutlineQuestionCircle, AiOutlinePlus } from "react-icons/ai";

import "../Left_Sidebar/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { inviteToGroup } from "../../redux/actions";

function UsersModal(props) {
  const { onHide, id } = props;
  const dispatch = useDispatch();
  const [invitedUser, setInvitedUser] = useState("");
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
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
        <Modal.Body>
          <h4 className="text-center text-color">Invite friends</h4>
          <div
            className="rounded-3 w-100"
            style={{ background: "#373249", padding: "0.5rem" }}
          >
            {LoggedInUser?.follows[0] ? (
              LoggedInUser?.follows?.map((user, index) => {
                const invite_action = () => {
                  console.log("inviting..");
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
                          maxHeight: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <h6 className="p-0 m-0">
                        {user.name} {user.surname}
                      </h6>
                    </div>

                    <div>
                      <Button
                        className="gradient-button p-1 d-flex align-items-center justify-content-center"
                        style={{
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      >
                        <AiOutlinePlus size={20} onClick={invite_action} />
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
        </Modal.Body>
      </div>
    </Modal>
  );
}
export default UsersModal;
