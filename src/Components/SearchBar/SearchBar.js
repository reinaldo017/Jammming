import './searchbar.css';

function SearchBar({ changeSearchTerm, fetchResults }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchResults();
    }

    const handleChange = ({ target }) => {
        changeSearchTerm(target.value);
    }
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="form__text-input" type="text" placeholder="Enter A Song, Album or Artist" onChange={handleChange}/>
            <input className="form__submit" type="submit" value="SEARCH"/>
        </form>
    )
}

export default SearchBar;