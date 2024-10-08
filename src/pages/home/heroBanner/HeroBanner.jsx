import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { MdFavorite, MdQuestionAnswer } from "react-icons/md";

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
            <Img src={background} />
          </div>
        )}

        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <div className="Title">{title}</div>
            <div className="description">{description}</div>
            <div className="buttonGroup">
              <div className="likeButton">
                <MdFavorite />
                <span>{like}</span>
              </div>
              <div className="enquireButton">
                <MdQuestionAnswer />
                <span>{enquiry}</span>
              </div>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
