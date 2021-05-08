import React, { useState } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import getMovies from '../api/getMovies.js';
import '../css/SearchPage.css'


const SearchPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedInput, setSearchedInput] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [nominatedMovies, setNominatedMovies] = useState([]);

    const handleSearch = () => {
        let movie = getMovies(searchInput).then(movieData => {
            if(movieData.Response === "False"){
                alert("Too many results, please search again!")
            }
            else{
                setSearchedMovies(movieData.Search);
                setSearchedInput(searchInput);
            }
        })
    }

    const updateSearch = (input) => {
        setSearchInput(input.target.value);
    }

    const nominateMovie = (movieTitle, movieYear) => {
        setNominatedMovies([...nominatedMovies, {title: movieTitle, year: movieYear}])
    }

    return (
    <div className="SearchPageContainer">
        <h1 className="SearchPageTitle">The Shoppies</h1>
        <SearchBar handleSearch={handleSearch} updateSearch={updateSearch}/>
        <div className="SearchPageMovies">
            <SearchResults movies={searchedMovies} searchInput={searchedInput} nominateMovie={nominateMovie}/>
            <div>
                {nominatedMovies.map(movie => {
                    return(<p>{movie.title}, {movie.year}</p>)
                })}
            </div>
        </div>
    </div>
    );
}

export default SearchPage;