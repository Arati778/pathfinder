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
  Box,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Img from "../../../../components/lazyLoadImage/Img";
import "./ProjectComponent.scss";
import DummyCards from "./Others/Others";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ProjectComponent = () => {
  const [open, setOpen] = useState(false);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnailImage: "",
    thumbnailLink: [],
    tags: [],
    username: localStorage.getItem("username"),
    id: generateUniqueId(), // Initialize with a unique numeric ID
  });
  // const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();

  // Determine if the current user is viewing their own profile
  const isOwner = id === userId;

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: typeof value === "string" ? value.split(",") : value,
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
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("tags", formData.tags.join(","));
      data.append("username", formData.username);
      data.append("id", formData.id);

      if (selectedFile) {
        data.append("thumbnailImage", selectedFile);
      }

      const response = await axios.post(
        "http://localhost:5000/api/projects",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Form data successfully posted:", response.data);
      setSubmittedData([...submittedData, response.data]);
      handleClose();
      setFormData({
        name: "",
        description: "",
        id: generateUniqueId(),
        thumbnailImage: [],
        tags: [],
        username: localStorage.getItem("username"),
      });
      console.log("ProjectId", userId);

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

  useEffect(() => {
    if (submittedData) {
      console.log(submittedData);
    }
  }, [submittedData]);

  return (
    <div>
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
          <input type="file" onChange={handleFileChange} accept="image/*" />
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
                margin: "5px",
                flex: "0 0 auto",
                cursor: "pointer",
                display: "inline-flex",
                flexDirection: "column",
                borderRadius: "3px",
                backgroundImage: project.thumbnailImage
                  ? `url(${project.thumbnailImage})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
                transition: "filter 0.3s ease-in-out",
              }}
              onClick={() => navigate(`/details/${project.projectId}`)}
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
                  variant="p"
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
      {isOwner && (
        <Button variant="contained" onClick={handleOpen}>
          Add Project
        </Button>
      )}
    </div>
  );
};

export default ProjectComponent;
