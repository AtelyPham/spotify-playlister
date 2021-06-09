import { store } from "react-notifications-component";

const mapData = (res) => {
  return res.map((track) => {
    return {
      id: track.id,
      name: track.name,
      album: track.album.name,
      artist: track.artists[0].name,
      URI: track.uri,
      isRemove: false,
    };
  });
};

const addNotification = (type, title = "", message = "") => {
  return store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    dismiss: {
      duration: 1500,
      onScreen: true,
    },
  });
};
const createPlaylist = async (playlistName, USER_ID, USER_ACCESS_TOKEN) => {
  if (!playlistName || !USER_ID || !USER_ACCESS_TOKEN)
    return Promise.reject(
      new Error("Error occuring when creating new playlist")
    );
  const res = await fetch(
    `https://api.spotify.com/v1/users/${USER_ID}/playlists`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + USER_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        name: playlistName,
      }),
    }
  );
  if (res.status === 200 || res.status === 201) return res.json();
  else return Promise.reject(new Error("Cannot create playlist!"));
};
const addTracksToPlaylist = async (tracks, PLAYLIST_ID, USER_ACCESS_TOKEN) => {
  if (!PLAYLIST_ID || !Array.isArray(tracks) || !USER_ACCESS_TOKEN)
    return Promise.reject(
      new Error("Error occuring when adding track to playlist!")
    );
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + USER_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          uris: tracks,
        }),
      }
    );
    return res.json();
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};
const fetchUserId = async (accessToken) => {
  if (!accessToken)
    return Promise.reject(new Error("No Access Token! Need to Sign In"));
  try {
    const data = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    const dataJson = await data.json();
    return Promise.resolve(dataJson.id);
  } catch (err) {
    return Promise.reject(new Error("Error when request User ID"));
  }
};

const fetchSearchDataAsync = async (term, USER_ACCESS_TOKEN) => {
  if (!term || !USER_ACCESS_TOKEN)
    return Promise.reject(
      new Error("No User Authorization or Empty Search String!")
    );
  try {
    const data = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}&market=vn`,
      {
        headers: {
          Authorization: "Bearer " + USER_ACCESS_TOKEN,
        },
      }
    );
    const dataJson = await data.json();
    return Promise.resolve(dataJson.tracks.items);
  } catch (err) {
    return Promise.resolve([]);
  }
};

const savePlaylistAsync = async (accessToken, playlistName, tracks) => {
  if (!Array.isArray(tracks) || tracks === [])
    return Promise.reject(new Error("Error occuring when save playlist!"));
  tracks = tracks.filter((track) => track.URI).map((track) => track.URI);
  if (tracks.length === 0) return Promise.reject(new Error("Empty playlist!"));
  try {
    const userId = await fetchUserId(accessToken);
    const playlistInfo = await createPlaylist(
      playlistName,
      userId,
      accessToken
    );
    const responseAddTrack = await addTracksToPlaylist(
      tracks,
      playlistInfo.id,
      accessToken
    );
    if (responseAddTrack.snapshot_id)
      return Promise.resolve("Add playlist successfull!");
    else return Promise.reject(new Error("Error when adding playist!"));
  } catch (err) {
    return Promise.reject(new Error(err.message));
  }
};

export { fetchSearchDataAsync, savePlaylistAsync, addNotification, mapData };
