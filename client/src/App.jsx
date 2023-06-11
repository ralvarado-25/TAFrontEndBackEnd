import { useEffect, useState } from "react";
import "./app.css";
import logo from './principal1.jpg';
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
    console.log(socket);
    console.log(user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} username ={user} />
          {posts.map((post) => (
            post.username !== user && (
              <Card key={post.id} post={post} socket={socket} user={user}/>
            )            
          ))}
          {/* <span className="username">{user}</span> */}
        </>
      ) : (
        <div className="login">
          <img src={logo} />
          <h2>Taller de Aplicaciones</h2>
          <input
            type="text"
            placeholder="Usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}><b>Ingresar</b></button>
        </div>
      )}
    </div>
  );
};

export default App;
