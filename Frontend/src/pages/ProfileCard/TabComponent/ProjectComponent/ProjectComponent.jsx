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
  Select,
  InputLabel,
  Chip,
  Box
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../../../components/lazyLoadImage/Img";
import "./ProjectComponent.scss";
import DummyCards from "./Others/Others";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import axios from "axios";

const ProjectComponent = () => {
  const [open, setOpen] = useState(false);
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem("Id"); // Get userId from local storage
  const userIds = userIdRedux || userIdLocalStorage;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnailImage: "",
    thumbnailLink: [],
    tags: [],
    username: localStorage.getItem("username"),
    id: 19
  });
  const userId = localStorage.getItem("userId");
  const username = 'Prince';
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleTagDelete = (tagToDelete) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((tag) => tag !== tagToDelete),
    }));
  };
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        formData
      );
      console.log("Form data successfully posted:", response.data);
      setSubmittedData([...submittedData, response.data]);
      handleClose();
      setFormData({
        name: "",
        description: "",
        id: 19,
        thumbnailImage: [],
        tags: [],
        username: "Prince"
      });
      console.log("ProjectId", userId);
      
      // Redirect to the details page of the newly added project
      navigate(`/details/${response.data.projectId}`);
    } catch (error) {
      console.error("Error posting form data:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        localStorage.setItem("username", response.data.username);
        console.log("Username saved to local storage:", response.data.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/projects/username/${username}`
      );
      setSubmittedData(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  const currencies = [
    { value: "Coding", label: "Coding" },
    { value: "Case Studies", label: "Case Studies" },
    { value: "Research", label: "Research" },
    { value: "Arts&Literature", label: "Arts&Literature" },
  ];

  // Log the submittedData to the console
  useEffect(() => {
    if (submittedData) {
      console.log(submittedData);
    }
  }, [submittedData]);

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
            name="name"
            label="Project Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            required
            error={!formData.name}
            helperText={!formData.name && "Project Name is required"}
          />
          <TextField
            margin="dense"
            id="projectDescription"
            name="description"
            label="Project Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="photoLink"
            name="thumbnailImage"
            label="Please post your Image url here"
            type="text"
            fullWidth
            value={formData.thumbnailImage}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              id="tags"
              name="tags"
              multiple
              value={formData.tags}
              onChange={handleTagChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => handleTagDelete(value)}
                    />
                  ))}
                </Box>
              )}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DummyCards />
          <ContentWrapper>
            <div>
              {formData.thumbnailImage &&
                formData.thumbnailImage.map((thumbnail, index) => (
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
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="project-cards-container">
        {submittedData && submittedData.length > 0 ? (
          submittedData.map((project, index) => (
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
                backgroundImage: project.thumbnailImage
                  ? `url(${project.thumbnailImage})`
                  : 'none',
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={() => navigate(`/details/${project.projectId}`)} // Redirect on click
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
                  {project.name}
                </Typography>
              </div>
            </Card>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      <Button variant="contained" onClick={handleOpen}>
        Add Project
      </Button>
    </div>
  );
};

export default ProjectComponent;
