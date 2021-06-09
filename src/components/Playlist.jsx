import React, { useState } from "react";
import "./Playlist.css";

function Playlist(props) {
  const [input, setInput] = useState("");
  const handleNameChange = (e) => {
    setInput(e.target.value);
  };

  const hanndleSave = () => {
    props.onSave(input);
    setInput("");
  };

  console.log("Playlist rendered!");
  return (
    <div className="Playlist">
      <input
        value={input}
        onChange={handleNameChange}
        placeholder="Enter a playlist name..."
      />
      {props.children}
      <button className="Playlist-save" onClick={hanndleSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
