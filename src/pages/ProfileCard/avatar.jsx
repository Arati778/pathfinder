import React, { useState, useEffect } from "react";
import { Col, Row, Upload, Avatar, Button, Modal, Spin, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import "./avatar.scss";
// import RadarChartExample from "./radar";
import MyBio from "./MyBio";
import ProfileCard from "./ProfileCard";
import TabComponent from "./TabComponent/Tabs";
import { useSelector } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../../store/userAction"; // Import the action to set userId
import { useDispatch } from "react-redux"; // Import useDispatch hook
import Header from "../../components/header/Header";

const AvatarComponent = () => {
  const [activeTabKey, setActiveTabKey] = useState("postroom");
  const [isEditMode, setIsEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [level, setLevel] = useState(1);
  const [imageLink, setImageLink] = useState(null);
  const [file, setFile] = useState(null); // Add file state
  const [loading, setLoading] = useState(false); // Add loading state
  const [modalVisible, setModalVisible] = useState(false); // Add modalVisible state
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem("Id"); // Get userId from local storage
  const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const [profilePic, setProfilePic] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
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
            lastDigits === userId ? userId : lastDigits
          }`
        );
        setUserDetails(response.data);
        setProfilePic(response.data.profilePic);
        localStorage.setItem("username", response.data.username);
        console.log("Username saved to local storage:", response.data.username);
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

  // if (!userDetails) {
  //   navigate('/login');
  //   return null;
  // }

  const defaultImageUrl =
    "https://img.freepik.com/premium-photo/close-portrait-red-cat-astronaut-wearing-helmet-ai-generated-illustration_871188-199.jpg?w=996"; // Change to your default image URL

  const beforeUpload = (file) => {
    setFile(file);
    setLoading(true); // Set loading to true before starting the upload

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageLink(reader.result);
      setLoading(false); // Set loading to false after the upload is complete
      openModal();
    };
    reader.readAsDataURL(file);

    return false; // Prevent default upload behavior
  };

  const handleProfileUpload = async () => {
    try {
      if (!file) {
        throw new Error("No file selected.");
      }

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://thezealplane-6dsp3b2ixq-uc.a.run.app/cloudinary",
        formData
      );
      console.log("image uploaded succesfully", response);
      const id = localStorage.getItem("Id");
      const publicId = response.data[0].public_id;
      const imageLink = response.data[0].secure_url;

      const PayData = { id, publicId, imageLink };
      const payData = await axios.post(
        "https://thezealplane-6dsp3b2ixq-uc.a.run.app/updateProfilePic",
        PayData
      );
      console.log(id);
      console.log(publicId);
      console.log(imageLink);
      console.log("image sent to backend succesfully", payData);
      setImageLink(imageLink);
      closeModal();
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      message.error("Failed to upload image to Cloudinary.");
    }
  };

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/Arati778/repos"
        );
        console.log("Github data:", response.data);
        // Use the response data as needed in your component
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGithubData();
  }, []);

  const handleEnquiry = async () => {
    try {
      // Perform POST request to the backend
      const response = await axios.post(
        "https://thezealplane-6dsp3b2ixq-uc.a.run.app/enquiry",
        {
          // Add any data you want to send in the request body
          userId: "Krishna060$U",
          userIdOfScroller: "Krishna00$U",
        }
      );
      // Handle the response as needed
      console.log("Enquiry response:", response.data);
      // Optionally, show a success message to the user
      message.success("Enquiry sent successfully");
    } catch (error) {
      console.error("Error sending enquiry:", error);
      // Show an error message to the user
      message.error("Failed to send enquiry");
    }
  };

  const lastDigitsMatch = window.location.href.match(/\d{1,2}$/);
  const lastDigits = lastDigitsMatch
    ? lastDigitsMatch[0].padStart(3, "0")
    : null;

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize(); // Check screen size on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="col" style={{ backgroundColor: "#0c0d2c", width: "100%" }}>
      <Header />
      <ContentWrapper>
        <div className="row">
          {isMobile ? (
            <div style={{ marginTop: "70px" }}>
              <div
                className="card mb-3"
                style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
              >
                <div className="card-body" style={{ marginRight: "10px" }}>
                  <Row justify="center" align="middle">
                    <Col>
                      <Upload
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                      >
                        {imageLink || profilePic ? (
                          <Avatar
                            size={130}
                            gap={2}
                            src={imageLink || profilePic}
                            style={{
                              boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                              border: "2px solid rgba(255, 0, 0, 0.8)",
                            }}
                          />
                        ) : (
                          <Avatar
                            size={150}
                            gap={2}
                            icon={<UserOutlined size={36} />}
                            style={{
                              boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                              border: "2px solid rgba(255, 0, 0, 0.8)",
                            }}
                          />
                        )}
                        <div
                          className="upload-overlay"
                          style={{ display: "none" }}
                        >
                          {lastDigits === userId && (
                            <UploadOutlined onClick={openModal} />
                          )}
                        </div>
                      </Upload>

                      <div>
                        <Modal
                          title="User Details"
                          visible={modalVisible}
                          onCancel={closeModal}
                          footer={null}
                        >
                          {loading ? (
                            <Spin />
                          ) : (
                            imageLink && (
                              <img
                                src={imageLink}
                                alt="User Image"
                                style={{ maxWidth: "100%" }}
                              />
                            )
                          )}
                          <Button
                            type="button"
                            onClick={handleProfileUpload}
                            style={{
                              background:
                                "linear-gradient(45deg, #232146, #3b2055)",
                              border: "none",
                              color: "#fff",
                              padding: "10px 15px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              transition: "background 0.3s", // Add transition for smooth effect
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background =
                                "linear-gradient(45deg, #3b2055, #232146)";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background =
                                "linear-gradient(45deg, #232146, #3b2055)";
                            }}
                          >
                            Upload Image
                          </Button>
                          <Button type="button" onClick={closeModal}>
                            Ok
                          </Button>
                        </Modal>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center text-sm-left mb-2 mb-sm-0">
                    {isEditMode ? (
                      <>
                        <input type="text" onChange={(e) => {}} />
                        <input type="text" onChange={(e) => {}} />
                        <button type="button">Save</button>
                      </>
                    ) : (
                      <>
                        {user || userDetails ? (
                          <>
                            <h5 className="pt-sm-2 pb-1 mb-0 mt-3 text-nowrap">
                              {userDetails.fullName}
                            </h5>
                            <p
                              className="mb-2"
                              style={{ marginBottom: "2rem" }}
                            >
                              @{user || userDetails.username}
                            </p>
                            <p
                              className="mb-0"
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#00bcd4",
                              }}
                            >
                              Level: {level}
                            </p>
                          </>
                        ) : (
                          <p>User data not available</p>
                        )}
                      </>
                    )}
                    <Row justify="center" style={{ marginTop: "20px" }}>
                      <Col>
                        <Button
                          type="button"
                          className="custom-button"
                          onClick={handleEnquiry}
                        >
                          Enquiry
                        </Button>
                      </Col>
                    </Row>
                    <div className="text-muted">
                      <small style={{ color: "white" }}>Last seen status</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col mb-3" style={{ marginTop: "50px" }}>
                <ProfileCard />
                <br />
                <TabComponent
                  activeTabKey={activeTabKey}
                  onTabChange={handleTabChange}
                />
              </div>
              <div
                className="card"
                style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
              >
                <div
                  className="card-body"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <h6 className="card-title font-weight-bold">Rewards</h6>
                  {/* <RadarChartExample /> */}
                </div>
              </div>
              <div
                className="card"
                style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
              >
                <div
                  className="card-body"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <MyBio />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="col mb-3" style={{ marginTop: "50px" }}>
                <ProfileCard />
                <br />
                <TabComponent
                  activeTabKey={activeTabKey}
                  onTabChange={handleTabChange}
                />
              </div>

              <br />
              <br />
              <div
                className="col-6 col-md-3 mb-6"
                style={{ marginTop: "70px" }}
              >
                <div
                  className="card mb-3"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <div className="card-body" style={{ marginRight: "10px" }}>
                    <Row justify="center" align="middle">
                      <Col>
                        <Upload
                          showUploadList={false}
                          beforeUpload={beforeUpload}
                        >
                          {imageLink || profilePic ? (
                            <Avatar
                              size={130}
                              gap={2}
                              src={imageLink || profilePic}
                              style={{
                                boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                                border: "2px solid rgba(255, 0, 0, 0.8)",
                              }}
                            />
                          ) : (
                            <Avatar
                              size={150}
                              gap={2}
                              icon={<UserOutlined size={36} />}
                              style={{
                                boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                                border: "2px solid rgba(255, 0, 0, 0.8)",
                              }}
                            />
                          )}
                          <div
                            className="upload-overlay"
                            style={{ display: "none" }}
                          >
                            {lastDigits === userId && (
                              <UploadOutlined onClick={openModal} />
                            )}
                          </div>
                        </Upload>

                        <div>
                          <Modal
                            title="User Details"
                            visible={modalVisible}
                            onCancel={closeModal}
                            footer={null}
                          >
                            {loading ? (
                              <Spin />
                            ) : (
                              imageLink && (
                                <img
                                  src={imageLink}
                                  alt="User Image"
                                  style={{ maxWidth: "100%" }}
                                />
                              )
                            )}
                            <Button
                              type="button"
                              onClick={handleProfileUpload}
                              style={{
                                background:
                                  "linear-gradient(45deg, #232146, #3b2055)",
                                border: "none",
                                color: "#fff",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                transition: "background 0.3s", // Add transition for smooth effect
                              }}
                              onMouseOver={(e) => {
                                e.target.style.background =
                                  "linear-gradient(45deg, #3b2055, #232146)";
                              }}
                              onMouseOut={(e) => {
                                e.target.style.background =
                                  "linear-gradient(45deg, #232146, #3b2055)";
                              }}
                            >
                              Upload Image
                            </Button>
                            <Button type="button" onClick={closeModal}>
                              Ok
                            </Button>
                          </Modal>
                        </div>
                      </Col>
                    </Row>

                    <div className="text-center text-sm-left mb-2 mb-sm-0">
                      {isEditMode ? (
                        <>
                          <input type="text" onChange={(e) => {}} />
                          <input type="text" onChange={(e) => {}} />
                          <button type="button">Save</button>
                        </>
                      ) : (
                        <>
                          {user || userDetails ? (
                            <>
                              <h5 className="pt-sm-2 pb-1 mb-0 mt-3 text-nowrap">
                                {userDetails.fullName}
                              </h5>
                              <p
                                className="mb-2"
                                style={{ marginBottom: "2rem" }}
                              >
                                @{user || userDetails.username}
                              </p>
                              <p
                                className="mb-0"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "#00bcd4",
                                }}
                              >
                                Level: {level}
                              </p>
                            </>
                          ) : (
                            <p>User data not available</p>
                          )}
                        </>
                      )}
                      <Row justify="center" style={{ marginTop: "20px" }}>
                        <Col>
                          <Button
                            type="button"
                            className="custom-button"
                            onClick={handleEnquiry}
                          >
                            Enquiry
                          </Button>
                        </Col>
                      </Row>
                      <div className="text-muted">
                        <small style={{ color: "white" }}>
                          Last seen status
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="card"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      background: "rgba(55, 65, 122, 0.1)",
                      color: "white",
                    }}
                  >
                    <h6 className="card-title font-weight-bold">Rewards</h6>
                    {/* <RadarChartExample /> */}
                  </div>
                </div>

                <div
                  className="card"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      background: "rgba(55, 65, 122, 0.1)",
                      color: "white",
                    }}
                  >
                    <MyBio />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <div className="col mb-3" style={{ marginTop: "50px" }}>
            <ProfileCard />
            <br />
            <TabComponent
              activeTabKey={activeTabKey}
              onTabChange={handleTabChange}
            />
          </div>

          <br />
          <br />
          <div className="col-6 col-md-3 mb-6" style={{ marginTop: "70px" }}>
            <div
              className="card mb-3"
              style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
            >
              <div className="card-body" style={{ marginRight: "10px" }}>
                <Row justify="center" align="middle">
                  <Col>
                    <Upload showUploadList={false} beforeUpload={beforeUpload}>
                      {imageLink || profilePic ? (
                        <Avatar
                          size={130}
                          gap={2}
                          src={imageLink || profilePic}
                          style={{
                            boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                            border: "2px solid rgba(255, 0, 0, 0.8)",
                          }}
                        />
                      ) : (
                        <Avatar
                          size={150}
                          gap={2}
                          icon={<UserOutlined size={36} />}
                          style={{
                            boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                            border: "2px solid rgba(255, 0, 0, 0.8)",
                          }}
                        />
                      )}
                      <div
                        className="upload-overlay"
                        style={{ display: "none" }}
                      >
                        {lastDigits === userId && (
                          <UploadOutlined onClick={openModal} />
                        )}
                      </div>
                    </Upload>

                    <div>
                      <Modal
                        title="User Details"
                        visible={modalVisible}
                        onCancel={closeModal}
                        footer={null}
                      >
                        {loading ? (
                          <Spin />
                        ) : (
                          imageLink && (
                            <img
                              src={imageLink}
                              alt="User Image"
                              style={{ maxWidth: "100%" }}
                            />
                          )
                        )}
                        <Button
                          type="button"
                          onClick={handleProfileUpload}
                          style={{
                            background:
                              "linear-gradient(45deg, #232146, #3b2055)",
                            border: "none",
                            color: "#fff",
                            padding: "10px 15px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "background 0.3s", // Add transition for smooth effect
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background =
                              "linear-gradient(45deg, #3b2055, #232146)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background =
                              "linear-gradient(45deg, #232146, #3b2055)";
                          }}
                        >
                          Upload Image
                        </Button>
                        <Button type="button" onClick={closeModal}>
                          Ok
                        </Button>
                      </Modal>
                    </div>
                  </Col>
                </Row>

                <div className="text-center text-sm-left mb-2 mb-sm-0">
                  {isEditMode ? (
                    <>
                      <input type="text" onChange={(e) => {}} />
                      <input type="text" onChange={(e) => {}} />
                      <button type="button">Save</button>
                    </>
                  ) : (
                    <>
                      {user || userDetails ? (
                        <>
                          <h5 className="pt-sm-2 pb-1 mb-0 mt-3 text-nowrap">
                            {userDetails.fullName}
                          </h5>
                          <p className="mb-2" style={{ marginBottom: "2rem" }}>
                            @{user || userDetails.username}
                          </p>
                          <p
                            className="mb-0"
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#00bcd4",
                            }}
                          >
                            Level: {level}
                          </p>
                        </>
                      ) : (
                        <p>User data not available</p>
                      )}
                    </>
                  )}
                  <Row justify="center" style={{ marginTop: "20px" }}>
                    <Col>
                      <Button
                        type="button"
                        className="custom-button"
                        onClick={handleEnquiry}
                      >
                        Enquiry
                      </Button>
                    </Col>
                  </Row>
                  <div className="text-muted">
                    <small style={{ color: "white" }}>Last seen status</small>
                  </div>
                </div>
              </div>
            </div> */}
          {/* <div
            className="card"
            style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
          >
            <div
              className="card-body"
              style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
            >
              <h6 className="card-title font-weight-bold">Rewards</h6>
              <RadarChartExample />
            </div>
          </div>
          <div
            className="card"
            style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
          >
            <div
              className="card-body"
              style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
            >
              <MyBio />
            </div>
          </div> */}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default AvatarComponent;
