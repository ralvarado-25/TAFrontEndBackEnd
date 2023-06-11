import "./navbar.css";
import Notification from "../../img/icons8-notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket, username }) => {
  console.log(username);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log(data);
      setMessage((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "le gustó";
      return (
        <span className="notification">{`A ${senderName} ${action} tu post.`}</span>
      );
    } else if (type === 3) {
      action = "compartio";
      return (
        <span className="notification">{`${senderName} ${action} tu post.`}</span>
      );
    }
    
  };

  const displayMessage = ({ senderName, type }) => {
    let action;
    if (type === 2) {
      console.log("ingresa a mensaje")
      action = "comento";
      return (
        <span className="message">{`${senderName} ${action} tu post.`}</span>
      );
    }
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Bienvenido {username}</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {
            notifications.length >0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon" onClick={() => setOpenMessage(!openMessage)}>
          <img src={Message} className="iconImg" alt="" />
          {
            message.length > 0 &&
            <div className="counter">{message.length}</div>
          }    
        </div>
        {/* <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
        </div> */}
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}          
          <button className="nButton" onClick={handleRead}>
            Marcar como leído
          </button>
        </div>
      )}
      {openMessage && (
        <div className="messages">          
          {message.map((n) => displayMessage(n))}
          <button className="nButton" onClick={handleRead}>
            Marcar como leído
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
