import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUsers } from "react-icons/fa"; // Import the notification bell icon
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import avatar from "../../assets/avatar.png";
import { setUserId } from "../../store/userAction"; // Import the action to set userId
import axios from "axios";
import logozp from "/src/assets/logo-zp.jpg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem("Id"); // Get userId from local storage
  const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserName(response.data.username);
        setProfilePic(response.data.profilePic);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Dispatch userId to Redux store if not already set
  useEffect(() => {
    if (!userIdRedux && userIdLocalStorage) {
      dispatch(setUserId(userIdLocalStorage));
    }
  }, [dispatch, userIdRedux, userIdLocalStorage]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  const handleNotificationClick = () => {
    navigate(`/home/Notification`);
  };

  const handleLogout = () => {
    // Dispatch logout action here
  };

  const handleForumClick = () => {
    navigate("/forum");
  };

  return (
    <header
      className={`header ${show}`}
      style={{
        position: "fixed",
        background: "rgba(0, 0, 0, 0.4)",
        width: "100%",
      }}
    >
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logozp} alt="Logo" />
        </div>
        <form className="search-bar">
          <span className="search-icon">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
        </form>
        <ul className="menuItems">
          <li className="menuItem" style={{ fontSize: "18px" }}>
            {/* <FaUsers /> */}
            <span onClick={handleForumClick}>Communities</span>
          </li>

          {/* <button class="publish-btn">Publish</button> */}

          <li
            className="menuItem"
            style={{ color: "white" }}
            onClick={handleNotificationClick}
          >
            <FaBell />
          </li>
          <li className="menuItem">
            <img
              src={profilePic || avatar}
              alt=""
              className="avatarImage"
              onClick={handleProfileClick}
            />
            {userName && <span className="username">{userName}</span>}
          </li>

          {user && (
            <li className="menuItem" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </ContentWrapper>
      {/* {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )} */}
    </header>
  );
};

export default Header;
