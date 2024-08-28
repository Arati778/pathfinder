import React from "react";
import { Card } from "antd";
import FeedbackComponent from "./feedback.jsx";
import "./Tabs.scss";
import ProjectComponent from "./ProjectComponent/ProjectComponent.jsx";

const TabComponent = ({ activeTabKey, onTabChange }) => {
  const tabList = [
    {
      key: "postroom",
      tab: <span style={{ color: "#fff" }}>Postroom</span>, // Green color
    },
    {
      key: "thoughts",
      tab: <span style={{ color: "#fff" }}>Thoughts</span>, // Green color
    },
    {
      key: "feedback",
      tab: <span style={{ color: "#fff" }}>Feedback</span>, // Green color
    },
  ];

  const contentList = {
    postroom: <ProjectComponent />,
    thoughts: <p>Thoughts Content </p>,
    feedback: <FeedbackComponent />,
  };

  return (
    <Card
      style={{
        width: "100%",
        height: "600px",
        background: "rgba(55, 65, 122, 0.1)",
        color: "white",
        overflow: "auto", // Add overflow property here
      }}
      tabListStyle={{ background: "linear-gradient(45deg, #4CAF50, #45a049)" }}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {contentList[activeTabKey]}
    </Card>
  );
};

export default TabComponent;
