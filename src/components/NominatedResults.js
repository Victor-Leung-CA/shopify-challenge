import React from 'react';
import '../css/NominatedResults.css'

const NominatedResults = (props) => {

    return (
        <div className="nominatedResultsContainer">
            <h3>Nominated Movies</h3>
            <ul>
                {props.nominatedMovies.map(movie => {
                    return(
                        <li key={movie.title}>
                            <p className="NominatedResultsList">{movie.title}, {movie.year}</p>
                            <button className="NominatedResultsButton" onClick={() => props.removeNomination(movie.title)}>
                                <p> Remove</p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default NominatedResults;