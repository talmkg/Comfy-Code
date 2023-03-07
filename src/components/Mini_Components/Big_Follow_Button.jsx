import { Button } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/actions";

const Big_Follow_Button = (id) => {
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  const dispatch = useDispatch();
  const Follow = () => {
    dispatch(follow(id.id));
  };
  const Unfollow = () => {
    dispatch(unfollow(id.id));
  };
  if (id.id === LoggedInUser._id) {
    return <></>;
  } else {
    let obj = LoggedInUser.follows.find((o) => o._id === id.id);
    if (obj) {
      return (
        <Button
          className="gradient-button p-1 d-flex align-items-center justify-content-center  rounded-1"
          style={{
            width: "110px",
            height: "35px",
          }}
          onClick={Unfollow}
        >
          <span className="me-1">Unfollow</span>
          <RxCross2 size={20} />
        </Button>
      );
    } else {
      return (
        <Button
          className="gradient-button p-1 d-flex align-items-center justify-content-center  rounded-1"
          style={{
            width: "110px",
            height: "35px",
          }}
          onClick={Follow}
        >
          <span className="me-1">Follow</span>
          <AiOutlinePlus size={20} />
        </Button>
      );
    }
  }
};
export default Big_Follow_Button;
