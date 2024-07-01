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
import { FaHeart, FaThumbsUp, FaPlus, FaShare, FaFlag, FaArrowRight, FaPencilAlt, FaTimes, FaHome, FaFolder, FaTrash } from 'react-icons/fa'; // Importing icons
import axios from 'axios'; // Import axios
import PosterFallback from "../../../../../assets/no-poster.png";
import "./style.scss";
import { setUserId } from '../../../../../store/userAction'; 
import { useSelector, useDispatch } from "react-redux";
import avatar from "../../../../../assets/avatar.png";
import { Breadcrumbs, Link, Typography} from '@mui/material';
import Header from "../../../../../components/header/Header";

const DetailsPage = () => {
  const { projectId } = useParams();
  const [localData, setLocalData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem('Id'); // Get userId from local storage
  const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const dispatch = useDispatch();

  // States for the modal
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('submittedData');
    setLocalData(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (localData) {
      const project = localData.find((item) => item.projectId === projectId);
      setProjectData(project);
    }
  }, [projectId, localData]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://thezealplane-6dsp3b2ixq-uc.a.run.app/getUserDetails/${userId}`);
        setUserName(response.data.username);
        setProfilePic(response.data.profilePic);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleAddImage = () => {
    // Implement logic to add an image to the project
    console.log('Add image functionality');
  };

  const handleCardClick = () => {
    // Implement logic for handling card click
    console.log('Card clicked');
  };

  const approvePost = async () => {
    const url = 'https://thezealplane-6dsp3b2ixq-uc.a.run.app/approvePost';
    const payload = {
      userId: 'johncena00$U',
      likerUserId: 'montubhai00$U',
      publicId: 'abcdefghijkl'
    };

    try {
      const response = await axios.post(url, payload);
      console.log('Response:', response.data);
      if (response.status === 200) {
        // Update the like count
        setProjectData((prevData) => ({
          ...prevData,
          likes: (prevData.likes || 0) + 1,
        }));
      }
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Implement logic to add new image and description to the project
    console.log('New Image:', newImage);
    console.log('Uploaded Image:', uploadedImage);
    console.log('New Description:', newDescription);
    // Close the modal after submission
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

  const sendToTheatre = () => {
    const requestData = {
      userId: "Krishna060$U",
      projectId: "49fa8fef-8794-4a07-a861-b443f533079e",
      theatrePicId: "cqlyuwqibmdpfd5k7lkm"
    };
  
    axios.post('https://thezealplane-6dsp3b2ixq-uc.a.run.app/uploadToTheatre', requestData)
      .then(response => {
        console.log('Image sent to theatre successfully:', response.data);
        // Handle success, e.g., show a success message
      })
      .catch(error => {
        console.error('Error sending image to theatre:', error);
        // Handle error, e.g., show an error message
      });
  };

  const Enquiry = () => {
    const EnquiryData = {
        userId: "king$U",
        userIdOfScroller: "kufu$U"    
    };
    axios.post('https://thezealplane-6dsp3b2ixq-uc.a.run.app/enquiry', EnquiryData)
    .then(response => {
      console.log('Successfully Enquired:', response.data);
      // Handle success, e.g., show a success message
    })
    .catch(error => {
      console.error('Enquiry Failed:', error);
      // Handle error, e.g., show an error message
    });

  }
  return (
    <div>
      <Header/>
      {projectData ? (
        <ContentWrapper>
          <div className="detailsBanner">
          <Breadcrumbs aria-label="breadcrumbs" className="enhanced-breadcrumbs">
      <Link onClick={() => navigate('/')} className="breadcrumb-link">
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
              <h1>This is a Superman for you !! Golden age Superman !</h1>
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
  style={{ width: '400px', height: '400px' }} // Set fixed width and height for the Swiper container
>
  {projectData.images && projectData.images.length > 0 ? (
    projectData.images.map((image, index) => (
      <SwiperSlide key={index}>
        <Img
          className="TitleImg"
          src={image || PosterFallback}
          alt={`Project Slide ${index + 1}`}
        />
        <button className="sendToTheatreButton" onClick={() => sendToTheatre(index)}>Send to Theatre</button>
      </SwiperSlide>
    ))
  ) : (
    <SwiperSlide>
      <Img
        className="TitleImg"
        src="https://swiperjs.com/demos/images/nature-2.jpg"
        alt="Project Poster"
      />
      <button className="sendToTheatreButton" onClick={() => sendToTheatre}>Send to Theatre</button>
    </SwiperSlide>
  )}
</Swiper>

              </div>
              <div className="right">
                <div className="overview">
                  <div className="description">
                    <h3 className="Description-Title">Description</h3>
                    {projectData.projectDescription}
                    Superman is a fictional superhero created by writer Jerry Siegel and artist Joe Shuster. He first appeared in Action Comics #1 in 1938, published by DC Comics. Superman is one of the most iconic and enduring superheroes in popular culture. Origin Story:
                  </div>
                  <br />
                  <p className="tags-Title">
                    Project Tag
                  </p>
                  <div className="tags">
                    <span>Coding</span>
                  </div>
                  <div className="created">created by: <span> Krishna Kumar</span></div>
                </div>
                <div className="buttons">
                  <button className="likeButton" onClick={approvePost}>
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
        <p>5.0</p>
      </div>
    </div>
    <button className="edit-profile-btn" onClick={Enquiry}>Enquire</button>
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
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}

       <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }}>
          <IconButton onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <FaTimes />
          </IconButton>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Image URL"
              fullWidth
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-image"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                Upload from Device
              </Button>
            </label>
            {uploadedImage && (
              <div style={{ marginTop: '10px' }}>
                <img src={uploadedImage} alt="Uploaded Preview" style={{ maxWidth: '100%' }} />
              </div>
            )}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default DetailsPage;