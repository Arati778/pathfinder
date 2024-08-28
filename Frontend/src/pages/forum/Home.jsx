import React from 'react';
import PostList from './Component/PostList';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar'; // Add Sidebar import
import './style.scss';

const Home = () => {
  const dummyPosts = [
    {
      id: 1,
      title: "What are some interesting facts about React?",
      body: "React is a JavaScript library for building user interfaces...",
      subreddit: "reactjs",
      author: "john_doe",
      timestamp: "2 hours ago",
      votes: 120,
      comments: [{ id: 1, body: "React is amazing!" }],
    },
    {
      id: 2,
      title: "How do you manage state in React?",
      body: "Managing state in React can be done with useState, useReducer...",
      subreddit: "webdev",
      author: "jane_doe",
      timestamp: "5 hours ago",
      votes: 75,
      comments: [{ id: 1, body: "I prefer Redux for complex state management." }],
    },
  ];

  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="content-container">
          <h2 className="page-title">Recent Posts</h2>
          <PostList posts={dummyPosts} />
        </main>
      </div>
    </div>
  );
};

export default Home;
