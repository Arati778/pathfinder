import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { FaTimes, FaEdit } from "react-icons/fa";
import Modal from "react-modal";
import "./avatar.scss";

Modal.setAppElement("#root");

const ProfileCard = () => {
  const [data, setData] = useState({
    username: "Krishna",
    jobRole: "FullStack Developer",
    description: "This is demo description",
    fullName: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: data.jobRole,
    description: data.description,
  });

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/1');
        console.log("userdata is:", response.data);
        const { fullName, description, jobRole } = response.data;
        setData((prevData) => ({
          ...prevData,
          fullName: fullName || 'Full Name not provided',
          description: description || 'Description not provided',
          jobRole: jobRole || 'Job Role not provided',
        }));
        setFormData({
          jobRole: jobRole || 'Job Role not provided',
          description: description || 'Description not provided',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveButtonClick = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/users/1', {
        jobRole: formData.jobRole,
        description: formData.description,
      });
      console.log('User data updated:', response.data);
      setData({
        ...data,
        jobRole: formData.jobRole,
        description: formData.description,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const customStyles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "70%",
      backgroundColor: "white",
      color: "black",
      padding: "20px",
    },
  };

  const responsiveStyles = () => {
    if (window.innerWidth <= 768) {
      customStyles.content.width = "80%";
      customStyles.content.height = "auto";
      customStyles.content.padding = "10px";
    }
  };

  responsiveStyles();
  window.addEventListener("resize", responsiveStyles);

  return (
    <div className="col mb-3" style={{ marginTop: "30px" }}>
      <div>
        <div
          className="card"
          style={{
            background: "transparent",
            color: "white",
            marginLeft: "10px",
            width: "100%",
            overflow: "auto",
            maxHeight: "250px",
          }}
        >
          <Button className="Edit" onClick={handleEditClick}>
            <FaEdit />
          </Button>
          <h5>
            <strong>Artist</strong> // <strong>Writer</strong> //{" "}
            <strong>FullStack Developer</strong> // {data.jobRole}
          </h5>
          <br />
          <h6>About Me</h6>
          <span>
            <p style={{ color: "white" }}>{data.description}</p>
          </span>
        </div>
      </div>

      <Modal
        isOpen={isEditing}
        onRequestClose={handleCancelClick}
        contentLabel="Edit Modal"
        style={customStyles}
      >
        <span
          onClick={handleCancelClick}
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "rgb(39, 39, 39)",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <FaTimes />
        </span>
        <div className="card-input-container">
          <h5>What's Your Passion</h5>
          <input
            type="text"
            name="jobRole"
            value={formData.jobRole}
            placeholder="Writer / Artist / Developer / Designer"
            onChange={handleInputChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <br />
          <h5>Description</h5>
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="About You"
            onChange={handleInputChange}
            style={{ marginBottom: "10px", width: "100%" }}
          />
          <span>
            <Button
              type="primary"
              onClick={handleSaveButtonClick}
              style={{ width: "60px" }}
            >
              Save
            </Button>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileCard;
