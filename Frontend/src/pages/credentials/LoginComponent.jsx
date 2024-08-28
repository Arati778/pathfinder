import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./RegisterComponent.scss";
import "/src/AboutCard/ModelStyle.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import glogo from "/src/assets/Google__G__logo.svg.png";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterComponent({ showModal, handleClose }) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const register = async () => {
    try {
      if (credentials.username.includes(" ")) {
        toast.error("Username cannot contain spaces");
        return;
      }

      if (credentials.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Send user data to the backend
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}/api/users/register`,
        credentials
      );
      console.log("Response from backend:", response.data);

      // Save user data to Redux
      dispatch(setUser(response.data));

      // Navigate to the login page
      navigate("/login");
      handleClose(); // Close the modal after registration
    } catch (err) {
      console.log(err);
      toast.error("Cannot create your account");
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      // Extract the Google token from the response
      const googleToken = credentialResponse.credential;

      console.log("Google Token:", googleToken);

      // Send the Google token to your backend
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}/api/users/google-login`,
        { token: googleToken }
      );

      // Save user data to Redux
      dispatch(setUser(response.data.user));

      // Redirect to the home page
      navigate("/home");
    } catch (err) {
      console.error("Error handling Google Sign-In:", err);
      toast.error("Google Sign-in failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>
        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials((prevCredentials) => ({
                ...prevCredentials,
                username: event.target.value,
              }))
            }
            type="text"
            className="common-input"
            placeholder="Your Unique Name"
          />
          <input
            onChange={(event) =>
              setCredentials((prevCredentials) => ({
                ...prevCredentials,
                email: event.target.value,
              }))
            }
            type="email"
            className="common-input"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials((prevCredentials) => ({
                ...prevCredentials,
                password: event.target.value,
              }))
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
          <input
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            className="common-input"
            placeholder="Confirm Password"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
        <div className="google-btn-container">
          <p className="go-to-signup">
            Already on ZealPlan?{" "}
            <span className="join-now" onClick={() => navigate("/profile")}>
              Sign in
            </span>
          </p>
        </div>
        <div>
          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() => toast.error("Google Sign-in failed")}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="google-btn"
              >
                <img src={glogo} alt="Google logo" className="google-logo" />
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}
