import { Button } from "react-bootstrap";
import {
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineUserDelete,
  AiOutlineUserAdd,
} from "react-icons/ai";
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
  if (id.id === LoggedInUser?._id) {
    return <></>;
  } else {
    let obj = LoggedInUser?.follows.find((o) => o._id === id.id);
    if (obj) {
      return (
        <Button
          className="gradient-button p-1 d-flex align-items-center justify-content-center me-2"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
          onClick={Unfollow}
        >
          <AiOutlineUserDelete size={25} />
        </Button>
      );
    } else {
      return (
        <Button
          className="gradient-button p-1 d-flex align-items-center justify-content-center me-2"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
          }}
          onClick={Follow}
        >
          <AiOutlineUserAdd size={25} />
        </Button>
      );
    }
  }
};
export default Follow_Button;
