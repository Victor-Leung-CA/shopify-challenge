import React, { useState } from 'react';
import '../css/SearchBar.css'
import SearchIcon from '../images/search-icon.svg'

const SearchBar = (props) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.handleSearch();
        }
    }

    return (
    <div className="SearchBarContainer">
        <h3 className = "SearchBarHeader">Nominate your favourite movies!</h3>
        <div>
            <input className="searchBar" placeholder="Search for movies..." type="text" onChange={props.updateSearch} onKeyDown={handleKeyDown}/>
            <button className="SearchBarButton" onClick={props.handleSearch}><img src={SearchIcon} className="SearchBarIcon"/></button>
        </div>
        
        
    </div>
    );
}

export default SearchBar;