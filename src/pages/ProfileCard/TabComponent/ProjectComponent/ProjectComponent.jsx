import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  Typography,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import Img from "../../../../components/lazyLoadImage/Img";
import "./ProjectComponent.scss";
import DummyCards from "./Others/Others";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import axios from "axios";

const ProjectComponent = () => {
  const [open, setOpen] = useState(false);
  const [loggedIn, SetLoggedIn] = useState(false);
  const userName = localStorage.getItem("username");
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem("Id"); // Get userId from local storage
  const userIds = userIdRedux || userIdLocalStorage;
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    photoLink: "",
    userId: localStorage.getItem("userId"),
    thumbnailLink: [],
    tags: [],
  });
  const userId = localStorage.getItem("userId");
  const lastDigitsMatch = window.location.href.match(/\d{1,2}$/);
  const lastDigits = lastDigitsMatch ? lastDigitsMatch[0].padStart(3, "0") : null;
  const {
    data: submittedData,
    loading,
    error,
  } = useGetData(
    `https://thezealplane-6dsp3b2ixq-uc.a.run.app/getAllProjectByUserName?offset=0&pageSize=5&userId=${userId}`
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: [...prevFormData.tags, value],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://thezealplane-6dsp3b2ixq-uc.a.run.app/saveProject",
        formData
      );
      console.log("Form data successfully posted:", response.data);
      // setSubmittedData([...submittedData, response.data]);
      handleClose();
      setFormData({
        projectName: "",
        projectDescription: "",
        photoLink: "",
        userId: localStorage.getItem("userId"),
        thumbnailLink: [],
        tags: [],
      });
      console.log("ProjectId", userId);
    } catch (error) {
      console.error("Error posting form data:", error);
    }
  };

  useEffect(() => {
    const lastDigitsMatch = window.location.href.match(/\d{1,2}$/);
    const lastDigits = lastDigitsMatch
      ? lastDigitsMatch[0].padStart(3, "0")
      : null;
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://thezealplane-6dsp3b2ixq-uc.a.run.app/getUserDetails/${
            lastDigits === userIds ? userIds : lastDigits
          }`
        );
        localStorage.setItem("username", response.data.username);
        console.log("Username saved to local storage:", response.data.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const currencies = [
    {
      value: "Coding",
      label: "Coding",
    },
    {
      value: "Case Studies",
      label: "Case Studies",
    },
    {
      value: "Research",
      label: "Research",
    },
    {
      value: "Arts&Literature",
      label: "Arts&Literature",
    },
  ];
  return (
    <div>
      <h1>This is Project</h1>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            name="projectName"
            label="Project Name"
            type="text"
            fullWidth
            value={formData.projectName}
            onChange={handleChange}
            required
            error={!formData.projectName}
            helperText={!formData.projectName && "Project Name is required"}
          />
          <TextField
            margin="dense"
            id="projectDescription"
            name="projectDescription"
            label="Project Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.projectDescription}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="photoLink"
            name="photoLink"
            label="Photo Link"
            type="text"
            fullWidth
            value={formData.photoLink}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <TextField
              margin="dense"
              id="outlined-select-currency"
              name="Select Category"
              select
              defaultValue="Coding"
              helperText="Please select your Category"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <DummyCards />
          <ContentWrapper>
            <div>
              {formData.thumbnailLink &&
                formData.thumbnailLink.map((thumbnail, index) => (
                  <Img
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail ${index}`}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                ))}
            </div>
          </ContentWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!formData.projectName}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {submittedData.map((item, index) => (
        <Card
          className="card"
          key={index}
          style={{
            width: window.innerWidth <= 768 ? "130px" : "200px",
            height: window.innerWidth <= 768 ? "170px" : "230px",
            margin: "10px",
            flex: "0 0 auto",
            cursor: "pointer",
            display: "inline-flex",
            flexDirection: "column",
            borderRadius: "5px",
            backgroundImage: `url(${item.photoLink})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={() => navigate(`/details/${item.projectId}`)} // Redirect on click
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              style={{ marginBottom: "5px" }}
            >
              {item.projectName}
            </Typography>
          </div>
        </Card>
      ))}
      {lastDigits === userIds && (
        <Button variant="contained" onClick={handleOpen}>
          Add Project
        </Button>
      )}
      {/* <p>Or you can choose projects from here</p>
      <DummyCards/> */}
    </div>
  );
};

export default ProjectComponent;
