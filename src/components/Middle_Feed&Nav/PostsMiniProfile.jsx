import { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa";
import MiniProfileTemplate from "./MiniProfileTemplate";
const PostsMiniProfile = (member) => {
  return (
    <>
      <div id="profile-picture-post" className="position-relative">
        <div>
          <img
            src={member.pfp}
            style={{
              border: "2px solid #5b5b5b",
              borderRadius: "50%",
              width: "65px",
              height: "65px",
              objectFit: "cover",
            }}
            className="me-2"
          />
        </div>
        <div className="position-absolute" style={{ right: "0%", top: "-50%" }}>
          <MiniProfileTemplate {...member} />
        </div>
      </div>
    </>
  );
};
export default PostsMiniProfile;
