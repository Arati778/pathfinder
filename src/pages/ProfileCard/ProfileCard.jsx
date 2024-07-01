import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { FaTimes, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "./avatar.scss";

Modal.setAppElement("#root");

const ProfileCard = ({ handleSaveClick }) => {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [hideEditButton, setHideEditButton] = useState(false); // State to hide edit button

  useEffect(() => {
    const userId = localStorage.getItem("Id");
    const lastDigitsMatch = window.location.href.match(/\d{1,3}$/);
    const lastDigits = lastDigitsMatch ? lastDigitsMatch[0] : null;

    if (userId) {
      console.log("UserId:", userId);
      console.log("Last one to three digits of URL:", lastDigits);

      if (lastDigits !== null) {
        if (userId === lastDigits) {
          console.log(
            "UserId and last one to three digits of URL are the same."
          );
        } else {
          console.log(
            "UserId and last one to three digits of URL are different."
          );
          setHideEditButton(true); // Set hideEditButton to true if different
        }
      } else {
        console.error("No last one to three digits found in the URL.");
      }

      axios
        .get(
          `https://thezealplane-6dsp3b2ixq-uc.a.run.app/getUserDetails/${userId}`
        )
        .then((res) => {
          setData(res.data);
          setFormData({
            Job: res.data.Job || "",
            description: res.data.description || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });

      toast.success("Signed In to ZealPlane!");
    } else {
      console.error("User ID not found in localStorage");
    }
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

  const handleSaveButtonClick = () => {
    handleSaveClick(formData);
    setIsEditing(false);
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
        {data ? (
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
            {!hideEditButton && (
              <Button className="Edit" onClick={handleEditClick}>
                <FaEdit />
              </Button>
            )}
            <h5>
              <strong>Artist</strong> // <strong>Writer</strong> //{" "}
              <strong>FullStack Developer</strong> // {data.jobRole}
            </h5>
            <br />
            <h6>About Me</h6>
            <span>
              <p style={{ color: "white" }}>
                Hey folks! I am Ishant. I consider myself to be an entrepreneur
                at heart, so I left my job to work full time on ZealPlane. I
                love working on problems, although I would rather chill and
                watch movies all day if I had the option too. I am a wannabe
                writer who shares his thoughts as a newsletter too. I like
                meeting new people, that's why I am in Bangalore for most part
                of the year. For the rest of the time, you can find me in BBSR
                tackling the pollution and extreme climate. I would love to
                connect with you. If you wanna talk, please reach out.
                {data.jobDescription}
              </p>
            </span>
          </div>
        ) : (
          <div style={{ marginTop: "90px" }}>Nothing to display</div>
        )}
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
            fontSize: "20 px",
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
            name="Job"
            value={formData.Job}
            placeholder="Writer / Arstist / Developer / Designer"
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
