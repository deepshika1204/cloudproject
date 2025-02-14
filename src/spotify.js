{/*getting end point*/}
export const authEndpoint = "https://accounts.spotify.com/authorize";

{/*redirect uri*/}
const redirectUri="http://localhost:3000/";

{/*connecting client id*/}
const clientId="98ef7f3801d34b85a2d8f9fe830408c3";

const scopes=[
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        //accesstoken=mysupersecretkey&name=astro
        let parts = item.split('=');
        initial[parts[0]]=decodeURIComponent(parts[1]);
        return initial;
    },{});
    
}




export const loginUrl= `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
    )}&response_type=token&show_dialog=true`;






