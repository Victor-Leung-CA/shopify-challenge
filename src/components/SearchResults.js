import React, { useState } from 'react';
import '../css/SearchResults.css'
import tick from '../images/tick.svg'

const SearchResults = (props) => {

    return (
    <div className="SearchResultsContainer">
        {props.movies.length > 0 && <h3 className="SearchResultsHeading">Search results for "{props.searchInput}"</h3>}
        <ul>
        {props.movies.map((movie,index) => {
            return(
                <li key={movie.imdbID + movie.year}>
                    <p className="SearchResultsMovieTitle">{movie.title} ({movie.year})</p>
                    {!props.showBanner && 
                    <button disabled={props.movies[index].nomination} className="SearchResultsButton" onClick={() => props.nominateMovie(movie.title, movie.year, movie.imdbID)}>
                        <img className="SearchResultsTick" src={tick} />
                        <p> Nominate</p>
                    </button>}
                </li>
            )
        })}
        </ul>
    </div>
    );
}

export default SearchResults;