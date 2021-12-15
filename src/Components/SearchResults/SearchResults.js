import './searchResults.css';
import Track from '../Track/Track';


function SearchResults({results, addToPlaylist}) {
    let tracks = [];

    if (results) {
        tracks = results.map( result => 
        <li key={result.id}>
            <Track 
                info = {result}
                addToPlaylist={addToPlaylist}  
            />
        </li>);
    }

    return (
        <div className="results">
            <div className="results__container">
                <h1 className="results__title">Results</h1>
                <ul className="results__tracks">
                    {tracks}
                </ul>
            </div>
        </div>
    )
}

export default SearchResults;