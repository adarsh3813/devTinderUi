import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import axios from "axios";
import { BASE_BACKEND_URL } from "../constants";
import { ErrorToast, SuccessToast } from "./utils/UtillComponents";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showSignUpSuccessToast, setShowSignUpSuccessToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_BACKEND_URL}/Login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");
    } catch (err) {
      setErrorMessage("Email or password is incorrect. Please try again 🙏");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_BACKEND_URL + "/Signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setShowSignUpSuccessToast(true);
      setTimeout(() => {
        setShowSignUpSuccessToast(false);
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setErrorMessage("Something went wrong ☹️");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen w-full mx-auto">
      <div className="hero-content flex-col lg:flex-row-reverse w-full gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold lg:w-[40vw]">
            {isLoginForm ? "Login now!" : "Sign up to start connecting!!!"}
          </h1>
        </div>
        <div className={`card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl`}>
          <div className="card-body">
            <fieldset className="fieldset w-[60vw]">
              {!isLoginForm && (
                <>
                  {" "}
                  <label className="fieldset-label text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="First name.."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="fieldset-label text-white mt-5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last name.."
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <label
                className={`fieldset-label text-white ${
                  isLoginForm ? "" : "mt-5"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="fieldset-label text-white mt-5">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isLoginForm && (
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
              )}
              <button
                className="fieldset-label btn btn-neutral hover:bg-white hover:text-black w-80 text-white"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign up!"}
              </button>
              <p
                className="hover:underline cursor-pointer font-bold mt-1"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                {isLoginForm
                  ? "New User? Sign up here!"
                  : "Existing user? Login here!"}
              </p>
            </fieldset>
          </div>
        </div>
      </div>
      {showSignUpSuccessToast && (
        <SuccessToast message={"Sign up complete!!"} />
      )}
      {errorMessage.length > 0 && <ErrorToast message={errorMessage} />}
    </div>
  );
};

export default Login;
