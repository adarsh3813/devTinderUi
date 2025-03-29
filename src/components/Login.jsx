import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./utils/userSlice";
import axios from "axios";
import { BASE_BACKEND_URL } from "../constants";
import { SuccessToast } from "./utils/UtillComponents";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
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
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMessage(err);
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
      console.log(err);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            {isLoginForm ? "Login now!" : "SignUp Now!"}
          </h1>
          <p className="py-6"></p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  {" "}
                  <label className="fieldset-label">First Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="First name.."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="fieldset-label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Last name.."
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="fieldset-label">Password</label>
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
              {errorMessage && (
                <p className="text-red-500">
                  {errorMessage?.response?.data?.message}
                </p>
              )}
              <button
                className="btn btn-neutral mt-4 hover:bg-white hover:text-black"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign up!"}
              </button>
              <p
                className="hover:underline cursor-pointer"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                {isLoginForm
                  ? "New User? Sign up here!"
                  : "Existing user? Login now!"}
              </p>
            </fieldset>
          </div>
        </div>
      </div>
      {showSignUpSuccessToast && (
        <SuccessToast message={"Sign up complete!!"} />
      )}
    </div>
  );
};

export default Login;
