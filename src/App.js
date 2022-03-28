import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [msgReceived, setMsgReceived] = useState([]);

  console.log("room,msg,msgrec", room, message, msgReceived);

  useEffect(() => {
    socket.on("receivemsg", (data) => {
      setMsgReceived([...msgReceived, data.message]);
    });
  }, [msgReceived]);

  const joinroomhandler = (e) => {
    setRoom(e.target.value);
  };

  const sendmessagehandler = (e) => {
    setMessage(e.target.value);
  };

  const joinroom = () => {
    if (room !== "") {
      socket.emit("joinroom", room);
    }
  };

  const sendmessage = () => {
    socket.emit("sendmessage", { message, room });
  };

  return (
    <div className="App">
      <input
        placeholder="Enter Room no"
        type="text"
        value={room}
        onChange={joinroomhandler}
      />
      <button onClick={joinroom}>Join Room</button>
      <br />
      <br />
      <input
        placeholder="Enter message"
        type="text"
        value={message}
        onChange={sendmessagehandler}
      />
      <button onClick={sendmessage}>Send</button>
      <h2>Messages:</h2>
      {msgReceived?.map((msg) => (
        <p>{msg}</p>
      ))}
    </div>
  );
}

export default App;
