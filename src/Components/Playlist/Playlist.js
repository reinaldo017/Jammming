import { useState, useEffect } from 'react';
import './playlist.css';
import Track from '../Track/Track';
import Spotify from '../../utils/Spotify';

function Playlist({ tracks, remove }) {
    const [playlist, setPlaylist] = useState({ name: 'New Playlist'});

    useEffect(() => {
        const tracksUris = tracks.map( track => track.uri);
        setPlaylist( prev => ({
            ...prev,
            uris: tracksUris
        }) );
    }, [tracks])

    //Fetch Request to Get The User's Id:
    const fetchUserId = async () => {
        const endpoint = 'https://api.spotify.com/v1/me';
        const options = {
            headers: {
                "Authorization": `Bearer ${Spotify.getAccessToken()}`
            }
        }

        try {
            const response = await fetch(endpoint, options);
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse.id;
            } else {
                throw new Error('Request for Client ID Failed!');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    //Fetch Request to Create a Playlist, Returns the Playlist Id:
    const createPlaylist = async (userId) => {
        const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const body = JSON.stringify({
            name: playlist.name
        });
        const options = {
            headers: {
                "Authorization": `Bearer ${Spotify.getAccessToken()}`
            },
            body: body,
            method: 'POST'
        }

        try {
            const response = await fetch(endpoint, options);
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('The created playlist is: ', jsonResponse);
                return jsonResponse.id;

            } else {
                throw new Error('Request For Create a Playlist Failed!');
            }

        } catch(error) {
            console.log(error.message)
        }
    }

    //Request For Add Songs To The Playlist:
    const addTracks = async (playlistId) => {
        const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const body = JSON.stringify({
            uris: playlist.uris
        });
        const options = {
            headers: {
                "Authorization": `Bearer ${Spotify.getAccessToken()}`
            },
            body: body,
            method: 'POST'
        }

        try {
            const response = await fetch(endpoint, options);

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('The Songs has been added: ', jsonResponse);
            } else {
                throw new Error("Request Failed, Songs Not Added");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleChange = ({ target }) => {
        setPlaylist( prev => ({
            ...prev,
            name: target.value
        }))
    }

    const handleClick = () => {
        fetchUserId()
            .then( userId => createPlaylist(userId) )
            .then( playlistId => addTracks(playlistId) )
            .catch( error => {
                console.log(error.message);
            })
    };

    const tracksAdded = tracks.map(track => {
        return (
            <li key={track.id}>
                <Track info={track} removeFromPlaylist={remove}/>
            </li>
        );
    }); 

    return (
        <div className="playlist">
            <div className="playlist__container">
                <input className="playlist__name" onChange={handleChange} value={playlist.name}/>
                <ul className="playlist__tracks">
                    {tracksAdded}
                </ul>
                <button className="playlist__button" onClick={handleClick}>SAVE TO SPOTIFY</button>
            </div>    
        </div>
    );
}

export default Playlist;