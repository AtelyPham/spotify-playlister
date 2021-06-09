import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import TrackList from "./TrackList";
import "./App.css";
import { Spotify } from "../util/Spotify";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    if (playlistTracks.findIndex((ele) => ele.id === track.id) >= 0) return;
    track.isRemove = true;
    const newList = [...playlistTracks];
    newList.push(track);
    setPlaylistTracks(newList);
    setSearchResults(searchResults.filter((ele) => ele.id !== track.id));
  };

  const removeTrack = (track) => {
    if (!track) return;
    track.isRemove = false;
    setPlaylistTracks(playlistTracks.filter((ele) => ele.id !== track.id));
    const newList = [...searchResults];
    newList.push(track);
    setSearchResults(newList);
  };

  const savePlaylist = (term) => {
    Spotify.savePlaylist(term, playlistTracks, setPlaylistTracks);
  };

  const search = (term) => {
    Spotify.search(term, setSearchResults);
  };

  console.log("App rendered!");
  return (
    <div>
      <h1>
        Spoti<span className="highlight">fy Play</span>lister
      </h1>
      <ReactNotification />
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults>
            <TrackList tracks={searchResults} onAdd={addTrack} />
          </SearchResults>
          <Playlist onSave={savePlaylist}>
            <TrackList tracks={playlistTracks} onRemove={removeTrack} />
          </Playlist>
        </div>
      </div>
    </div>
  );
}

export default App;
