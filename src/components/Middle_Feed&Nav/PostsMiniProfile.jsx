import { Row, Col, Button } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa";
import MiniProfileTemplate from "./MiniProfileTemplate";
const PostsMiniProfile = (member) => {
  return (
    <>
      <div id="profile-picture-post">
        <div>
          <img
            src={member.pfp}
            style={{
              border: "2px solid #f7a3b1",
              borderRadius: "50%",
              width: "65px",
              height: "65px",
              objectFit: "cover",
            }}
            className="me-2"
          />
        </div>
        <MiniProfileTemplate {...member} />
      </div>
    </>
  );
};
export default PostsMiniProfile;
