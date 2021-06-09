import React from "react";
import "./Track.css";

function Track({ track, onAdd, onRemove }) {
  const { artist, album, name, isRemove } = track;

  console.log("Track rendered!");
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>
          {artist} | {album}
        </p>
      </div>
      <button
        className="Track-action"
        onClick={() => (!isRemove ? onAdd(track) : onRemove(track))}
      >
        {!isRemove ? "+" : "-"}
      </button>
    </div>
  );
}

export default Track;
