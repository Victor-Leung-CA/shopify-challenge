import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import SearchBar from './SearchBar'
import NominatedResults from './NominatedResults'
import Banner from './Banner'
import getMovies from '../api/getMovies.js';
import '../css/SearchPage.css'

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchedInput, setSearchedInput] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [nominatedMovies, setNominatedMovies] = useState([]);
    const [showBanner, setShowBanner] = useState(false);

    //Get saved state
    useEffect(() => {
        // Retrieve the last state
        let nominatedMoviesState = localStorage.getItem('nominatedMovies') ? JSON.parse(localStorage.getItem('nominatedMovies')) : nominatedMovies;
        setNominatedMovies(nominatedMoviesState);
        if(nominatedMoviesState.length === 5){
            setShowBanner(true);
        }
    },[])

    useEffect(() => {
        //Cache data
        localStorage.setItem('nominatedMovies', JSON.stringify(nominatedMovies));
    })

    //Use API to search and append movie results
    const handleSearch = () => {
        let movie = getMovies(searchInput).then(movieData => {
            if(movieData.Response === "False"){
                alert("Too many results, please search again!")
            }
            else{
                let movieDataTemp = movieData.Search.map(movie => {return({title: movie.Title, year: movie.Year, imdbID: movie.imdbID, nomination: false})});
                setSearchedMovies(movieDataTemp);
                setSearchedInput(searchInput);
            }
        })
    }

    //Update search input as user types
    const updateSearch = (input) => {
        setSearchInput(input.target.value);
    }

    //Nominate a movie
    const nominateMovie = (movieTitle, movieYear, imdbID) => {
        //Check if there are 5 nominated movies
        if(showBanner === false){
            //Add to nominated movie list
            let duplicateMovie = nominatedMovies.find(movie => movie.title === movieTitle && movie.year === movieYear);

            //Add to nominated results if not a duplicate movie
            if(duplicateMovie === undefined){
                //Add nominated movie to list
                setNominatedMovies([...nominatedMovies, {title: movieTitle, year: movieYear, imdbID: imdbID}]);

                 //Disable button
                let searchMoviesIndex = searchedMovies.findIndex(movie => movie.title === movieTitle && movie.year === movieYear);
                let searchedMoviesTemp = [...searchedMovies];
                searchedMoviesTemp[searchMoviesIndex].nomination = true;
                setSearchedMovies(searchedMoviesTemp);

                //If nominated movies reaches 5, show banner
                if(nominatedMovies.length === 4){
                    setShowBanner(true);
                }
            }
        }
    }

    //Remove movie nomination
    const removeNomination = (movieTitle, movieYear) =>{

        //Remove movie from nomination list
        let removeNominationIndex = nominatedMovies.findIndex(movie => movie.title === movieTitle && movie.year === movieYear);
            if(removeNominationIndex > -1){
                let nominatedMoviesTemp = [...nominatedMovies];
                nominatedMoviesTemp.splice(removeNominationIndex, 1);
                setNominatedMovies(nominatedMoviesTemp);
                setShowBanner(false);

                //Undisable button
                let searchMoviesIndex = searchedMovies.findIndex(movie => movie.title === movieTitle && movie.year === movieYear);
                if(searchMoviesIndex > -1){
                    let searchedMoviesTemp = [...searchedMovies];
                    searchedMoviesTemp[searchMoviesIndex].nomination = false;
                    setSearchedMovies(searchedMoviesTemp);
                }
            }

    }

    return (
    <div className="SearchPageContainer">
        <h1 className="SearchPageTitle">The Shoppies</h1>
        <SearchBar handleSearch={handleSearch} updateSearch={updateSearch}/>
        {showBanner && <Banner />}
        <div className="SearchPageMovies">
            {searchedMovies.length > 0 && <SearchResults movies={searchedMovies} 
                                                         searchInput={searchedInput} 
                                                         nominateMovie={nominateMovie} 
                                                         nominatedMovies={nominatedMovies} 
                                                         showBanner={showBanner}/>}
            {nominatedMovies.length > 0 && <NominatedResults nominatedMovies={nominatedMovies} removeNomination={removeNomination}/>}
        </div>
    </div>
    );
}

export default SearchPage;