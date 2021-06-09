import React from "react";
import Track from "./Track";
import "./TrackList.css";

function TrackList(props) {
  const tracks = props.tracks;

  const { onAdd, onRemove } = props;
  console.log("TrackList rendered!");
  return (
    <div className="TrackList">
      {tracks.map(({ id, name, album, artist, isRemove, URI }) => (
        <Track
          key={id}
          track={{
            id,
            name,
            album,
            artist,
            isRemove,
            URI,
          }}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default TrackList;
