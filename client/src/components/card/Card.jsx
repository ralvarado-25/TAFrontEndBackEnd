import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";
// import { Modal, Button } from 'react-bootstrap'
// import ModalDialog from './ModalDialog'

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);
  const [likedMessage, setLikedMessage] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  const handleMessage = (type) => {
    type === 2 && setLikedMessage(true);
    socket.emit("sendMessage", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        {likedMessage ? (
          <img src={Comment} alt="" className="cardIcon" />
        ) : (
          <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleMessage(2)}
        />  
        )}        
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        {/* <img src={Info} alt="" className="cardIcon infoIcon" /> */}
      </div>
      
    </div>
  );
};

export default Card;
