import React, { useState } from 'react';
import '../css/SearchResults.css'

const SearchResults = (props) => {

    return (
    <div className="SearchResultsContainer">
        {props.movies.length > 0 && <h3>Search results for "{props.searchInput}"</h3>}
        <ul>
        {props.movies.map(movie => {
            return(
                <li key={movie.imdbID}>
                    <p className="SearchResultsMovieTitle">{movie.Title} ({movie.Year})</p>
                    <button className="SearchResultsButton" onClick={() => props.nominateMovie(movie.Title, movie.Year)}>Nominate</button>
                </li>
            )
        })}
        </ul>
    </div>
    );
}

export default SearchResults;