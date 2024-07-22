import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import {
  MdFavorite,
  MdQuestionAnswer,
  MdHome,
  MdTrendingUp,
  MdUpdate,
  MdShuffle,
  MdStar,
} from "react-icons/md";

const HeroBanner = ({ selectedPosterUrl }) => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");
  const [datas, setDatas] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [like, setLike] = useState(null);
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get("http://localhost:4000/projects");
        console.log(res.data);
        setDatas(res.data);

        // Set the initial background and description
        setBackground(res.data[0]?.projectImageLink);

        let index = 0;
        const interval = setInterval(() => {
          index = (index + 1) % res.data.length;
          setTitle(res.data[index]?.projectTitle);
          setBackground(res.data[index]?.projectImageLink);
          setDescription(res.data[index]?.projectDescription);
          setLike(res.data[index]?.approved);
          setEnquiry(res.data[index]?.enquired);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
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
          <img
            src="https://m.media-amazon.com/images/M/MV5BZmI2MzU3NmMtNGVmMS00YzczLWIzMGQtNDU0MjcyNTYzODEyXkEyXkFqcGdeQWxiaWFtb250._V1_.jpg"
            alt="Overlay"
          />
          <div className="sidebar">
            <div className="Title">Money Heist</div>
            <div className="description">
              A criminal mastermind who goes by "The Professor" has a plan to
              pull off the biggest heist in recorded history – to print billions
              of euros in the Royal Mint of Spain.
            </div>
            <div className="buttonGroup">
              <button className="likeButton">
                <MdFavorite /> Like
              </button>
              <button className="enquireButton">
                <MdQuestionAnswer /> Enquire
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
