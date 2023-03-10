import { Row, Col, Button } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import Follow_Button from "../Mini_Components/Follow_Button";
import { Link } from "react-router-dom";
const MiniProfileTemplate = (member) => {
  return (
    <div
      id="mini-profile"
      className="position-absolute text-light rounded-3"
      style={{
        backgroundColor: "#1F1D2D",
        zIndex: 99,
        width: "300px",
      }}
    >
      <div className="position-relative ">
        <Row
          className="g-0 rounded-top"
          style={{
            height: "75px",
            backgroundSize: "100% 100%",

            backgroundSize: "cover",
            backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.5)),
              url(${member.background})`,
          }}
        >
          <Row
            style={{
              backdropFilter: "blur(1px)",
              borderTopRightRadius: "15px",
              borderTopLeftRadius: "15px",
            }}
            className="p-0 m-0"
          >
            <Col
              xs={9}
              className="position-relative"
              style={{
                borderTopLeftRadius: "15px",
                backdropFilter: "blur(1px)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-20%",
                }}
                className="d-flex"
              >
                <img
                  src={member.pfp}
                  style={{
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                  className="me-2 mx-2"
                />
                <div>
                  <Link
                    to={`/profile/${member._id}`}
                    className="d-flex text-truncate"
                    style={{
                      fontSize: "20px",
                      color: "#6BC2E5",
                      textDecoration: "none",
                    }}
                  >
                    {member.name} {member.surname}
                  </Link>
                  <div className="opacity-75">Online</div>
                </div>
              </div>
            </Col>
            <Col
              xs={3}
              className="position-relative d-flex justify-content-center"
              style={{
                borderTopRightRadius: "15px",
              }}
            >
              <div style={{ position: "absolute", bottom: "-20%" }}>
                <Follow_Button id={member._id} />
              </div>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="pe-2 px-2 text-light pt-3 pb-2">
              {member.bio ? (
                <p className="m-0 " style={{ color: "#6BC2E5" }}>
                  About me:
                </p>
              ) : (
                <p className="m-0 " style={{ color: "#6BC2E5" }}>
                  No info here.. yet.
                </p>
              )}

              <p className="m-0 text">{member.bio}</p>
            </div>
          </Col>
          <Col xs={12} className="d-flex">
            <div className="w-100 h-100 d-flex justify-content-start">
              {member?.badges?.map((badge, i) => {
                return (
                  <div key={i} className="d-flex justify-content-start">
                    <div
                      className="p-1 pb-2 d-flex align-items-center"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={badge.icon}
                        className="me-1"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xs={12}>
            <Button className="w-100 rounded-0 rounded-bottom gradient-button center-flex">
              <span className="me-2">Send a message</span>
              <FaRegPaperPlane />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MiniProfileTemplate;
