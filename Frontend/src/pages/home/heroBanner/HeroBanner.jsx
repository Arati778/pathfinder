import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import avtar from "/src/assets/avatar.png";
import "./style.scss";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Img from "../../../components/lazyLoadImage/Img";
import useFetch from "../../../hooks/useFetch";
import {
  MdFavorite,
  MdQuestionAnswer,
  MdHome,
  MdTrendingUp,
  MdUpdate,
  MdShuffle,
  MdStar,
  MdShare,
  MdThumbUp,
} from "react-icons/md";
import HeroBannerData from "./HeroBannerData";

// TruncatedDescription Component
const TruncatedDescription = ({ description, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="description">
      {isExpanded ? description : `${description.substring(0, maxLength)}..`}
      {description.length > maxLength && (
        <span className="readMore" onClick={toggleReadMore}>
          {isExpanded ? " Read Less" : " Read More"}
        </span>
      )}
    </div>
  );
};

const HeroBanner = ({ selectedPosterUrl }) => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get("http://localhost:4000/projects");
        setDatas(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProject();
  }, []);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src="https://m.media-amazon.com/images/M/MV5BZmI2MzU3NmMtNGVmMS00YzczLWIzMGQtNDU0MjcyNTYzODEyXkEyXkFqcGdeQWxiaWFtb250._V1_.jpg" />
            <div className="bottom-opacity-layer"></div>{" "}
            {/* Add opacity layer */}
          </div>
        )}

        <div className="opacity-layer"></div>

        <div className="iconSidebar">
          <div className="iconWrapper">
            <MdStar className="icon" />
            <span>Recommended</span>
          </div>
          <div className="iconWrapper">
            <MdHome className="icon" />
            <span>Curated</span>
          </div>
          <div className="iconWrapper">
            <MdTrendingUp className="icon" />
            <span>Trending</span>
          </div>
          <div className="iconWrapper">
            <MdUpdate className="icon" />
            <span>Upcoming</span>
          </div>
          <div className="iconWrapper">
            <MdShuffle className="icon" />
            <span>Random</span>
          </div>
        </div>

        <div className="overlayImageBox">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-navigation-size": "25px",
              "--swiper-pagination-color": "#fff",
              "--swiper-pagination-size": "2px",
              width: "1050px",
              height: "550px ",
              padding: "0px",
            }}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            lazy={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]} // Ensure Autoplay is included here
          >
            {HeroBannerData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="slideContent">
                  <div className="imageWrapper">
                    <img src={item.projectImageLink} alt={item.projectTitle} />
                  </div>

                  <div className="hoverContent">
                    {/* Title and Description */}
                    <div className="titleDescriptionContainer">
                      <div className="title">{item.projectTitle}</div>
                      <TruncatedDescription
                        className="description"
                        description={item.projectDescription}
                        maxLength={100}
                      />
                    </div>

                    {/* Avatar */}
                    <div className="avatarContainer">
                      <div className="profileIcon">
                        <img src={item.profileIconLink} alt="Profile" />
                        <span>{item.profileName}</span>
                      </div>
                    </div>

                    {/* Like and Share Icons  */}
                    <div className="iconsContainer">
                      <div className="icons">
                        <MdThumbUp className="icon" />
                        <MdShare className="icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
