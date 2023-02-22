import { Button } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/actions";

const Follow_Button = (id) => {
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
          className="post-like-button p-1 d-flex align-items-center justify-content-center me-2"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
          onClick={Unfollow}
        >
          <RxCross2 size={20} />
        </Button>
      );
    } else {
      return (
        <Button
          className="post-like-button p-1 d-flex align-items-center justify-content-center me-2"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
          onClick={Follow}
        >
          <AiOutlinePlus size={20} />
        </Button>
      );
    }
  }
};
export default Follow_Button;