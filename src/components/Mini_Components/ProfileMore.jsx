import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { MdMoreHoriz } from "react-icons/md";

function ProfileMore() {
  const [isOptions, setIsOptions] = useState(false);

  return (
    <>
      <div className="position-relative">
        <div
          onClick={(e) => {
            setIsOptions(isOptions ? false : true);
          }}
        >
          <MdMoreHoriz size={30} className="mx-3" />
        </div>
        <div
          id="center-bottom"
          style={{
            backgroundColor: "#2a273d",
            height: "max-content",
            width: "200px",
            display: isOptions ? "block" : "none",
            border: "1px solid rgba(255, 255, 255, 0.192)",
          }}
          className="rounded-2 p-1 "
        >
          <Button size="sm" className="options-left-sidebar-button center-flex">
            <AiOutlineMessage size={20} className="me-2" />
            Send a message
          </Button>

          <Button size="sm" className="options-left-sidebar-button center-flex">
            <HiOutlineAtSymbol size={20} className="me-2" />
            Copy username
          </Button>
          <Button size="sm" className="options-left-sidebar-button center-flex">
            <FaUsers size={20} className="me-2" />
            Invite to group
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProfileMore;
