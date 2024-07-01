import React from 'react'
import DetailsPage from './DetailsPage/DetailsPage';
import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import AddProject from './AddProject/AddProject';
import Similar from '../../../details/carousels/Similar';
import Recommendation from '../../../details/carousels/Recommendation';
import Trending from '../../../home/trending/Trending';
import Recommended from '../../../home/Recommended/Recommended';

const ProjectPage = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  return (
    <div>
        <DetailsPage/>
        <AddProject/>
        <Trending/>
        <Recommended/>
    </div>
  )
}

export default ProjectPage
