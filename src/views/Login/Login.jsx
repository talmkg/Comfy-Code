import "./styles.css";
import { Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  GLOBAL_LOADING,
  LOADING,
  LOGIN,
} from "../../redux/actions";
import { getToken } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const LoggedInUser = useSelector((state) => state?.main.LoggedInUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getToken(email, password, setErrorMessage));
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (LoggedInUser[0] !== undefined) {
      navigate(LoggedInUser[0]?._id ? "/home" : "/login");
    }
    if (Array.isArray(LoggedInUser[0])) {
      console.log("isarray");
      if (LoggedInUser.length === 0) {
        navigate(LoggedInUser[0]?._id ? "/home" : "/login");
      }
    }
  });

  return (
    <>
      <div
        className="w-100"
        style={{ backgroundColor: "#191724", height: "100vh" }}
      >
        <img
          className="background"
          src="https://res.cloudinary.com/dp3i1dce4/image/upload/v1677531145/ComfyCode/login_srmfgs.jpg"
        />
        <div
          className="rounded-3 p-4 text-color glass"
          id="center"
          style={{ width: "600px" }}
        >
          <div className="d-flex justify-content-center">
            <div className="text-center pb-3">
              <BsCodeSlash size={40} className="m-2" />
              <code className="text-center text-color code">
                <h3>Comfy Code</h3>
              </code>
            </div>
          </div>
          {errorMessage ? (
            <>
              <Alert variant="danger">Wrong Username or Password!</Alert>
            </>
          ) : (
            <></>
          )}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="bg-transparent"
                style={{ border: "none" }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => onChangeHandler(e.target.value, setEmail)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={passwordShown ? "text" : "password"}
                className="bg-transparent"
                style={{ border: "none" }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => onChangeHandler(e.target.value, setPassword)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Show the password"
                onClick={togglePassword}
                style={{ userSelect: "none" }}
              />
            </Form.Group>
            <div className="d-flex justify-content-center pt-2">
              <Link to="/">
                <Button
                  size="lg"
                  type="submit"
                  onClick={onSubmit}
                  style={{
                    backgroundColor: "#433d66",
                    border: "none",
                    borderRadius: "20px",
                    width: "150px",
                  }}
                  className="gradient-button"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
