import './track.css';

function Track({ info, addToPlaylist, removeFromPlaylist }) {
    const handleAdd = () => {
        addToPlaylist(info);
    };

    const handleRemove = () => {
        removeFromPlaylist(info.id);
    }

    return (
        <div className="track">
            <div className="track__info">
                <h2 className="track__name">{info.name}</h2>
                <h3 className="track__artist">{info.artists[0].name}</h3>
            </div>
            {removeFromPlaylist ? 
                <button className="track__button" onClick={handleRemove}>-</button>
                :<button className="track__button" onClick={handleAdd}>+</button>
            }
        </div>
    );
}

export default Track;