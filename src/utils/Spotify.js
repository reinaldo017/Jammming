
const Spotify = (() => {
    let accessToken = '';
    const clientId = '9434a31109c74623bb11b0e6b5be9702';
    const urlToFetch = 'https://accounts.spotify.com/authorize';
    const redirectUri = 'https://jammingwithreinaldo.netlify.app/';
    const scope = 'playlist-modify-private, playlist-modify-public';
    const endpoint = `${urlToFetch}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    const url = window.location.href;

    function setAccessToken() {
        accessToken = url.match(/access_token=([^&]*)/)[1];
        const expirationTime = url.match(/expires_in=([^&]*)/)[1];

        setTimeout( () => {
            accessToken = '';
            window.history.pushState('Access Token', null, '/');
        }, expirationTime * 1000);
    }
    
    function getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else if ( url.includes('access_token') ) {
            setAccessToken();
            return accessToken;
        } else {
            window.location = endpoint;
        }
    }

    return {getAccessToken};
}) ();

export default Spotify 