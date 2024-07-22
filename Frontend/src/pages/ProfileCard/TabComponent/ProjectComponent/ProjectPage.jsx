import React, { useEffect, useState } from 'react';
import DetailsPage from './DetailsPage/DetailsPage';
import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import AddProject from './AddProject/AddProject';
import Similar from '../../../details/carousels/Similar';
import Recommendation from '../../../details/carousels/Recommendation';
import Trending from '../../../home/trending/Trending';
import Recommended from '../../../home/Recommended/Recommended';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const { data, loading, error } = useFetch(`http://localhost:5000/api/projects/${projectId}`);

  useEffect(() => {
    if (data) {
      setProjectData(data);
    }
  }, [data]);

  return (
    <div>
      {loading && <p>Loading project details...</p>}
      {error && <p>Error: {error.message}</p>}
      {projectData && (
        <>
          <DetailsPage project={projectData} />
          <AddProject />
          {/* <Similar projectId={projectId} />
          <Recommendation projectId={projectId} />
          <Trending />
          <Recommended /> */}
        </>
      )}
    </div>
  );
}

export default ProjectPage;
