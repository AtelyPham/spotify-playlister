import {
    fetchSearchDataAsync,
    savePlaylistAsync,
    mapData,
    addNotification,
} from "./utils";

var Spotify = (function () {
    let CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    let REDIRECT_URI = "http://localhost:3000";
    let USER_ACCESS_TOKEN = "";
    let EXPIRATION_TIME = -1;
    // current url for checking
    let currentUrl = window.location.href;
    // regex for access token and expiration time
    let regexAccessToken = /access_token=([^&]*)/;
    let regexExpiresIn = /expires_in=([^&]*)/;

    return {
        getAccessToken() {
            if (USER_ACCESS_TOKEN && USER_ACCESS_TOKEN !== "") {
                return USER_ACCESS_TOKEN;
            } else if (
                currentUrl.match(regexAccessToken) &&
                currentUrl.match(regexExpiresIn)
            ) {
                // Get the current user in the url
                USER_ACCESS_TOKEN = currentUrl.match(regexAccessToken)[1];
                EXPIRATION_TIME = currentUrl.match(regexExpiresIn)[1];
                window.setTimeout(() => {
                    USER_ACCESS_TOKEN = "";
                }, EXPIRATION_TIME * 1000);
                window.history.pushState("Access Token", null, "/");
                return USER_ACCESS_TOKEN;
            } else if (USER_ACCESS_TOKEN === "") {
                // redirect to the login authorization
                const login = () => {
                    try {
                        window.location.replace(
                            `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}&show_dialog=true`
                        );
                    } catch (error) {
                        throw new Error(error);
                    }
                };
                return login();
            }
        },
        search(term, setSearchResults) {
            let accessToken = this.getAccessToken();
            if (!accessToken || accessToken === "")
                return Promise.reject(new Error("Need to Sign in"));
            fetchSearchDataAsync(term, accessToken)
                .then((res) => {
                    setSearchResults(mapData(res));
                    addNotification(
                        "success",
                        "Search sucess!",
                        "Congratulation! you have finised searching! 🎉"
                    );
                })
                .catch((rej) => {
                    addNotification("danger", "Error! ⚠️", rej.message);
                });
        },
        savePlaylist(playlistName, tracks, setPlaylistName, setPlaylistTracks) {
            let accessToken = this.getAccessToken();
            if (!playlistName || tracks === [] || !Array.isArray(tracks)) {
                addNotification("danger", "Error!", "Empty name or tracks");
                return;
            }
            if (!window.confirm("Continue saving playlist")) {
                addNotification(
                    "warning",
                    "Cancel",
                    "Canceled saving playlist!"
                );
                return;
            }
            savePlaylistAsync(accessToken, playlistName, tracks)
                .then(() => {
                    addNotification(
                        "success",
                        "Playlist added!",
                        "You just add a playlist to your Spotify profile! 🎉📌"
                    );
                    setPlaylistName("");
                    setPlaylistTracks([]);
                })
                .catch((rej) => {
                    addNotification("danger", "Error! ❌", rej.message);
                });
        },
    };
                    addNotification("danger", "Error! ❌", rej.message);
                });
        },
    };
})();

export { Spotify };
