import "./styles.css";
import { Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, LOGIN } from "../../redux/actions";
import { getToken } from "../../redux/actions";
import { Link, redirect, useNavigate } from "react-router-dom";
const Login = () => {
  const LoggedInUser = useSelector((state) => state?.LoggedInUser[0]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getToken(username, password, setErrorMessage));
  };
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  useEffect(() => {
    if (LoggedInUser !== undefined) {
      dispatch(fetchAllUsers());
      navigate(LoggedInUser?._id ? "/home" : "/login");
    }
  });

  return (
    <>
      <div
        className="w-100"
        style={{ backgroundColor: "#191724", height: "100vh" }}
      >
        <img
          class="background"
          src="https://res.cloudinary.com/dp3i1dce4/image/upload/v1675716761/ynAD1u_altaak.webp"
          style={{ zIndex: "0" }}
        />
        <div className="rounded-3 p-4 text-light glass" id="main-window">
          <div className="d-flex justify-content-center">
            <div className="text-center pb-3">
              <BsCodeSlash size={40} className="m-2" />
              <h3 className="text-center logo">Comfy Code</h3>
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                className="bg-transparent"
                style={{ border: "none" }}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => onChangeHandler(e.target.value, setUsername)}
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
            <div className="d-flex justify-content-end pt-2">
              <Link to="/">
                <Button
                  type="submit"
                  onClick={onSubmit}
                  style={{ backgroundColor: "#433d66", border: "none" }}
                >
                  Login
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
