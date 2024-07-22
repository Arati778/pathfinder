import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Img from '../../../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../../../components/contentWrapper/ContentWrapper';
import { FaHeart, FaThumbsUp, FaPlus, FaShare, FaFlag, FaArrowRight, FaPencilAlt, FaTimes, FaHome, FaFolder, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import PosterFallback from "../../../../../assets/no-poster.png";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import avatar from "../../../../../assets/avatar.png";
import { Breadcrumbs, Link, Typography} from '@mui/material';
import Header from "../../../../../components/header/Header";

const DetailsPage = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem('Id');
  const userId = userIdRedux || userIdLocalStorage;
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const dispatch = useDispatch();

  // States for the modal
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/id/66941a4002074d6fb5d82d0f`);
        console.log("projectData is:", response.data);
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserName(response.data.username);
        setProfilePic(response.data.profilePic);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleAddImage = () => {
    console.log('Add image functionality');
  };

  const handleCardClick = () => {
    console.log('Card clicked');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('New Image:', newImage);
    console.log('Uploaded Image:', uploadedImage);
    console.log('New Description:', newDescription);
    handleClose();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Header/>
      {projectData ? (
        <ContentWrapper>
          <div className="detailsBanner">
            <Breadcrumbs aria-label="breadcrumbs" className="enhanced-breadcrumbs">
              <Link onClick={() => navigate('/home')} className="breadcrumb-link">
                <FaHome className="breadcrumb-icon" />
                Home
              </Link>
              <Link onClick={() => navigate('/projects')} className="breadcrumb-link">
                <FaFolder className="breadcrumb-icon" />
                Projects
              </Link>
              <Typography className="breadcrumb-current">Details</Typography>
            </Breadcrumbs>
            <div className="title">
              <h1>{projectData.name}</h1>
            </div>
            <ul className="menuItems">
              <li className="menuItem">
                {userName && <span>{userName}</span>}
                <img src={profilePic || avatar} alt="" className="avatarImage" />
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
                  spaceBetween={1}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  style={{ width: '400px', height: '400px' }}
                >
                  {projectData.images && projectData.images.length > 0 ? (
                    projectData.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <Img
                          className="TitleImg"
                          src={image || PosterFallback}
                          alt={`Project Slide ${index + 1}`}
                        />
                        <button className="sendToTheatreButton">Send to Theatre</button>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <Img
                        className="TitleImg"
                        // src="https://swiperjs.com/demos/images/nature-2.jpg"
                        src={projectData.thumbnailImage}
                        alt="Project Poster"
                      />
                      <button className="sendToTheatreButton">Send to Theatre</button>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              <div className="right">
                <div className="overview">
                  <div className="description">
                    <h3 className="Description-Title">Description</h3>
                    {projectData.description}
                    Superman is a fictional superhero created by writer Jerry Siegel and artist Joe Shuster. He first appeared in Action Comics #1 in 1938, published by DC Comics. Superman is one of the most iconic and enduring superheroes in popular culture. Origin Story:
                  </div>
                  <br />
                  <p className="tags-Title">
                    Project Tag
                  </p>
                  <div className="tags">
                    <span>{projectData.tags}</span>
                  </div>
                  <div className="created">created by: <span>{projectData.publisher}</span></div>
                </div>
                <div className="buttons">
                  <button className="likeButton" onClick={handleAddImage}>
                    <FaThumbsUp /> Like ({projectData.likes || 0})
                  </button>
                  <button className="wishlistButton">
                    <FaHeart /> Wishlist ({projectData.wishlist || 0})
                  </button>
                </div>
              </div>
            </div>
            <br />
            <h4>Like My Project?</h4>
            <div className="User-Profile">
              <div className="avatar-container">
                <img src={profilePic || avatar} alt="" className="avatarImage" />
              </div>
              <div className="user-details">
                <h3 className="username">{userName}</h3>
                <p className="user-description">Web Developer | Graphic Designer | ZealPlane Seller</p>
                <div className="user-stats">
                  <div className="stat">
                    <h4>Projects Completed</h4>
                    <p>10</p>
                  </div>
                  <div className="stat">
                    <h4>Orders in Queue</h4>
                    <p>2</p>
                  </div>
                  <div className="stat">
                    <h4>Rating</h4>
                    <p>{projectData.ratings}</p>
                  </div>
                </div>
                <button className="edit-profile-btn" onClick={handleAddImage}>Enquire</button>
              </div>
            </div>
            <h3>My Portfolio</h3>
          </div>
        </ContentWrapper>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box className="modalBox">
          <IconButton onClick={handleClose} className="closeButton">
            <FaTimes />
          </IconButton>
          <h2>Edit Project</h2>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="New Image URL"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="raised-button-file">
              <Button variant="raised" component="span" className="uploadButton">
                Upload Image
              </Button>
            </label>
            {uploadedImage && <img src={uploadedImage} alt="Uploaded Preview" className="uploadedPreview" />}
            <TextField
              label="New Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailsPage;
