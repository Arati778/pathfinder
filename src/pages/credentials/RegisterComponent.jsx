import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./RegisterComponent.scss";
import "/src/AboutCard/ModelStyle.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import glogo from "/src/assets/Google__G__logo.svg.png";

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

      if (!credentials.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (credentials.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Dispatch the user data to Redux
      dispatch(setUser(credentials));

      // Send user data to the backend
      const response = await axios.post(
        "https://thezealplane-6dsp3b2ixq-uc.a.run.app/registerUser",
        credentials
      );
      console.log("Response from backend:", response.data);

      // Navigate to the home page
      navigate("/login");
      handleClose(); // Close the modal after registration
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const googleUser = await window.gapi.auth2.getAuthInstance().signIn();
      const googleToken = googleUser.getAuthResponse().id_token;

      const response = await axios.post(
        "https://thezealplane-6dsp3b2ixq-uc.a.run.app/registerGoogleUser",
        { token: googleToken }
      );
      console.log("Response from Google API:", response.data);

      // Navigate to the home page or profile page
      navigate("/profile");
      handleClose(); // Close the modal after registration
    } catch (err) {
      console.log(err);
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
                fullName: event.target.value,
              }))
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
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
          <button onClick={handleGoogleRegister} className="google-btn">
            <img src={glogo} alt="Google logo" className="google-logo" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
