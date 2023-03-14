import "./styles.css";
import { Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BsCodeSlash, BsGithub } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  GLOBAL_LOADING,
  LOADING,
  LOGIN,
  TOKEN,
} from "../../redux/actions";
import { getToken } from "../../redux/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import { GIT_TOKEN } from "../../redux/actions/gitActions";
import { loadAllData } from "../../redux/actions/loaderActions";
const Login = () => {
  const LoggedInUser = useSelector((state) => state?.main.LoggedInUser);
  const authtoken = useSelector((state) => state?.main.token);
  const localGitToken = useSelector((state) => state.git.git_token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getToken(email, password, setErrorMessage));
  };
  const onSubmitGithub = async () => {
    const client_id = "17108820745456263cc0";
    const newclientsecret = "9e03c5f440e8d33782e14456433e73f25a1483e1";
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    );
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

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
    if (codeParam !== null) {
      async function getAccessToken() {
        await fetch(
          `http://localhost:3002/git/getAccessToken?code=` + codeParam,
          {
            method: "GET",
          }
        )
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              dispatch({
                type: GIT_TOKEN,
                payload: data.access_token,
              });
              getGitUserData(data.access_token);
            }
          });
      }
      //
      getAccessToken();
      //
      async function getGitUserData(token) {
        await fetch(`http://localhost:3002/git/getUserData`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.login) {
              getUserByGitCredentials(data);
            }
          });
      }
      async function getUserByGitCredentials(data) {
        await fetch(
          `http://localhost:3002/git/findByGitCredentials/${data.login}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //here, if all g, we will have user data and token
            // so, we need to dispatch loggedinuser and token
            if (data.token && data.user) {
              console.log("user credentials (token, user): ", data);

              dispatch({
                type: LOGIN,
                payload: data.user,
              });
              dispatch({
                type: TOKEN,
                payload: data.token,
              });
              dispatch(loadAllData());
            }
          });
      }
    }
  }, []);
  return (
    <>
      <div
        className="w-100"
        style={{ backgroundColor: "#191724", height: "100vh" }}
      >
        <Particles options={particlesOptions} init={particlesInit} />
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
            <div className="d-flex flex-column align-items-center pt-2">
              <Button
                as={Link}
                to="/"
                type="submit"
                onClick={onSubmit}
                style={{
                  backgroundColor: "#433d66",
                  border: "none",
                  borderRadius: "20px",
                  width: "max-content",
                  minWidth: "120px",
                }}
                className="gradient-button"
              >
                Sign In
              </Button>
              <div className="p-1">OR</div>
              <Button
                variant="light"
                onClick={onSubmitGithub}
                style={{
                  border: "none",
                  borderRadius: "20px",
                  width: "max-content",
                }}
                className="center-flex"
              >
                <BsGithub size={25} className="me-1" /> Sign In with Github
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
