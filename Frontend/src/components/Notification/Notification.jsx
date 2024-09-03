import React, { useState } from "react";
import "./NotificationPage.scss"; // Import SCSS file
import Header from "../header/Header";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Message",
      description: "You have received a new message from John Doe.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 2,
      title: "Reminder",
      description: "Don't forget to submit your weekly report by tomorrow.",
      time: "2 hours ago",
      read: true,
    },
    // Add more notifications as needed
  ]);

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-top">
      <Header />
      <div className="notification-page">
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? "read" : "unread"}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-info">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-description">
                  {notification.description}
                </div>
                <div className="notification-time">{notification.time}</div>
              </div>
              {!notification.read && <div className="unread-indicator"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
