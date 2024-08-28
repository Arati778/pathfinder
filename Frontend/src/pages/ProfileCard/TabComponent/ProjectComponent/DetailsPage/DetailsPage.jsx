import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Pagination, Navigation, Thumbs } from "swiper/modules";
import Img from "../../../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../../../components/contentWrapper/ContentWrapper";
import {
  FaHeart,
  FaThumbsUp,
  FaPlus,
  FaShare,
  FaFlag,
  FaArrowRight,
  FaPencilAlt,
  FaTimes,
  FaHome,
  FaFolder,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import PosterFallback from "../../../../../assets/no-poster.png";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import avatar from "../../../../../assets/avatar.png";
import Header from "../../../../../components/header/Header";
import Feedback from "../../../../../components/carousel/Projexts/Feedback";

const DetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  // States for the modal
  const [open, setOpen] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  // State for Thumbs
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setThumbnailImage(file);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/projects/id/${projectId}`
        );
        console.log("projectData is:", response.data);
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

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

  const handleCardClick = () => {
    console.log("Card clicked");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateProject = async () => {
    const formData = new FormData();
    formData.append("projectId", projectId);
    formData.append("thumbnailImage", thumbnailImage); // Assuming thumbnailImage is a file

    try {
      // Send request to update the project
      const updateResponse = await axios.post(
        `http://localhost:5000/api/projects/id/${projectId}`, // Use the correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Updated project response:", updateResponse.data);

      // Refresh project data
      const refreshResponse = await axios.get(
        `http://localhost:5000/api/projects/id/${projectId}`
      );

      setProjectData(refreshResponse.data);
      handleClose();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      // Send a POST request to the server to register the like
      const response = await axios.post(`http://localhost:5000/api/like`, {
        userId: "66aa8b86ec331872d8b599dc", // Example user ID
        likerId: "66aa8b86ec331872d8b599dc", // Example liker ID
        projectId: "134c971e-6785-49e3-9371-3ee3acc714d3", // Example project ID
      });

      // Log the response from the server
      console.log("Like added successfully:", response.data);

      // Toggle the liked state to change the icon color
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error("There was an error liking the item:", error);
    }
  };
  return (
    <div>
      <Header />
      {projectData ? (
        <ContentWrapper>
          <div className="detailsBanner">
            {/* <Breadcrumbs
              aria-label="breadcrumbs"
              className="enhanced-breadcrumbs"
            >
              <Link
                onClick={() => navigate("/home")}
                className="breadcrumb-link"
              >
                <FaHome className="breadcrumb-icon" />
                Home
              </Link>
              <Link
                onClick={() => navigate("/projects")}
                className="breadcrumb-link"
              >
                <FaFolder className="breadcrumb-icon" />
                Projects
              </Link>
              <Typography className="breadcrumb-current">Details</Typography>
            </Breadcrumbs> */}
            <div className="title">
              <h1>{projectData.name}</h1>
            </div>
            <ul className="menuItems">
              <li className="menuItem">
                <img
                  src={
                    "https://img.freepik.com/premium-photo/detailed-comic-book-art-young-female-warrior-standing-alone-neoncity-street-ai-generated_665346-45905.jpg" ||
                    avatar
                  }
                  alt=""
                  className="avatarImage"
                />
                {userName && <span style={{ color: "white" }}>{userName}</span>}
                <span className="badge">Top Rated</span>
              </li>
              <li className="menuItem iconBox">
                <FaShare className="icon" title="Share" />
              </li>
              <li className="menuItem iconBox">
                <FaFlag className="icon" title="Report" />
              </li>
              <li className="menuItem iconBox">
                <FaArrowRight className="icon" title="Go to" />
              </li>
              <li className="menuItem iconBox" onClick={handleOpen}>
                <FaPencilAlt className="icon" title="Edit" />
              </li>
              <li className="menuItem iconBox" onClick={handleOpen}>
                <FaTrash className="icon" title="Delete Project" />
              </li>
            </ul>
            <div className="content">
              <div className="left">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  lazy={true}
                  pagination={{
                    clickable: true,
                  }}
                  thumbs={{ swiper: thumbsSwiper }}
                  navigation={true}
                  modules={[Pagination, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {projectData.thumbnailImages &&
                  projectData.thumbnailImages.length > 0 ? (
                    projectData.thumbnailImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Img
                          className="thumbImg"
                          src={image || PosterFallback}
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <Img
                        className="thumbImg"
                        src={projectData.thumbnailImages || PosterFallback}
                        alt="Thumbnail"
                      />
                    </SwiperSlide>
                  )}
                </Swiper>

                {/* Thumbnail Swiper */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[Navigation, Thumbs]}
                  className="mySwiper-thumbs"
                >
                  {projectData.thumbnailImages &&
                  projectData.thumbnailImages.length > 0 ? (
                    projectData.thumbnailImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Img
                          className="thumbImg"
                          src={image || PosterFallback}
                          alt={`Thumbnail ${index + 1}`}
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <Img
                        className="thumbImg"
                        src={projectData.thumbnailImages || PosterFallback}
                        alt="Thumbnail"
                      />
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              <div className="right">
                <div className="project-container row-layout">
                  <div className="project-item">
                    <img
                      src="https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/666306/grid_0_3.png?w=608&ar=default&fit=crop&crop=faces&auto=format"
                      alt="Project 1"
                      className="project-image"
                    />
                    <div className="project-content">
                      <h4>Project Title 1</h4>
                      <p>
                        Description of the project goes here. This could include
                        details about the project, technologies used, etc.
                      </p>
                    </div>
                  </div>
                  <div className="project-item">
                    <img
                      src="https://miro.medium.com/v2/resize:fit:1088/1*qpiqp74gFtmTA8nCGY8FMg.jpeg"
                      alt="Project 2"
                      className="project-image"
                    />
                    <div className="project-content">
                      <h4>Project Title 2</h4>
                      <p>
                        Description of the project goes here. This could include
                        details about the project, technologies used, etc.
                      </p>
                    </div>
                  </div>
                  <div className="project-item">
                    <img
                      src="https://weirdwonderfulai.art/wp-content/uploads/2023/01/comic-illustrations-1080x675.jpg"
                      alt="Project 3"
                      className="project-image"
                    />
                    <div className="project-content">
                      <h4>Project Title 3</h4>
                      <p>
                        Description of the project goes here. This could include
                        details about the project, technologies used, etc.
                      </p>
                    </div>
                  </div>
                  <div className="project-item">
                    <img
                      src="https://i0.wp.com/scifi.radio/wp-content/uploads/2022/12/superfrog.jpg?fit=1024%2C575&ssl=1"
                      alt="Project 4"
                      className="project-image"
                    />
                    <div className="project-content">
                      <h4>Project Title 4</h4>
                      <p>
                        Description of the project goes here. This could include
                        details about the project, technologies used, etc.
                      </p>
                    </div>
                  </div>
                  <div className="project-item">
                    <img
                      src="https://img.freepik.com/premium-photo/detailed-comic-book-art-young-female-warrior-standing-alone-neoncity-street-ai-generated_665346-45905.jpg "
                      alt="Project 3"
                      className="project-image"
                    />
                    <div className="project-content">
                      <h4>Project Title 3</h4>
                      <p>
                        Description of the project goes here. This could include
                        details about the project, technologies used, etc.
                      </p>
                    </div>
                  </div>
                  <div className="project-item">
                    <img
                      src="https://img.freepik.com/premium-photo/room-full-things-that-look-like-witch-dark_665346-44599.jpg"
                      alt="Project 4"
                      className="project-image"
                    />
                    <div className="project-content">
                      <h4>Project Title 4</h4>
                      <p>
                        Description of the project goes here. This could include
                        details about the project, technologies used, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="description">{projectData.description}</div>
            <br />
            <h4 style={{ color: "white", marginBottom: "30px" }}>
              Like My Project?
            </h4>
            <div className="User-Profile">
              <div className="avatar-container">
                <img
                  src={
                    "https://img.freepik.com/premium-photo/detailed-comic-book-art-young-female-warrior-standing-alone-neoncity-street-ai-generated_665346-45905.jpg  " ||
                    avatar
                  }
                  alt=""
                  className="avatarImage"
                />
              </div>
              <div className="user-details">
                <h3 className="username">{userName}</h3>
                <p className="user-description">
                  Web Developer | Graphic Designer | ZealPlane Seller
                </p>
                <div className="user-stats">
                  <div className="stat">
                    <h4>Projects Completed</h4>
                    <p>10</p>
                  </div>
                  <div className="stat">
                    <h4>Orders Completed</h4>
                    <p>5</p>
                  </div>
                  <div className="stat">
                    <h4>Positive Ratings</h4>
                    <p>80%</p>
                  </div>
                </div>
                <div className="user-actions">
                  <IconButton className="likeButton" onClick={handleLikeClick}>
                    <FaThumbsUp style={{ color: liked ? "blue" : "orange" }} />
                  </IconButton>
                  <IconButton className="messageButton">
                    <FaPlus style={{ color: "orange" }} />
                  </IconButton>
                  <IconButton
                    className="messageButton"
                    onClick={() => Enquiry()}
                  >
                    <FaShare style={{ color: "orange" }} />
                  </IconButton>
                </div>
              </div>
            </div>
            <Feedback />
          </div>
        </ContentWrapper>
      ) : (
        <p>Loading...</p>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            padding: 2,
            backgroundColor: "white",
            margin: "auto",
            marginTop: "20vh",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Project
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProject}
            >
              Update
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailsPage;
