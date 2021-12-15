import { useState } from 'react';
import './app.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../utils/Spotify';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const changeSearchTerm = (value) => {
    setSearchTerm(value);
  };


  const [results, setResults] = useState('');

  const fetchResults = async () => {
    const typeParam = 'track';
    const endpoint = 	`https://api.spotify.com/v1/search?q=${searchTerm}&type=${typeParam}&limit=10`;
    const options = {
      headers: {
        "Authorization": `Bearer ${Spotify.getAccessToken()}`
      }
    }

    try {
      const response = await fetch(endpoint, options);

      if (response.ok) {
        const jsonResponse = await response.json();
        const tracks = jsonResponse.tracks.items;
        console.log(tracks);
        setResults(tracks);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const [tracksAdded, setTracksAdded] = useState([]);

  const addToPlaylist = (track) => {
    setTracksAdded(prev => {
      if ( tracksAdded.includes(track) ) {
        return prev;
      } else {
        return [...prev, track];
      }
    });
  }

  const removeFromPlaylist = (trackId) => {
    setTracksAdded(prev => prev.filter( track => track.id !== trackId)
    );
  }

  return (
    <div className="app">
      <header className="header">Ja<span>mmm</span>ing</header>
      <main className="main">
        <SearchBar changeSearchTerm={changeSearchTerm} fetchResults={fetchResults}/>
        <section className="container">
          <SearchResults results={results} addToPlaylist={addToPlaylist}/>
          <Playlist tracks={tracksAdded} remove={removeFromPlaylist}/>
        </section>
      </main>
    </div>
  );
}

export default App;
