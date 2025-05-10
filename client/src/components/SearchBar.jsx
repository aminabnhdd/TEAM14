
// This component is a search bar that could be used in different ways according to the onSearch function passed to it as props

import img from "../assets/material-symbols_search.svg";
import "../ComponentsStyles/SearchBar.css";
import { useState, useContext } from "react";
import AuthContext from '../helpers/AuthContext';
import { useNavigate } from "react-router-dom";
import Pfp from "./pfp";

function SearchBar({ onSearch, title, fixed = false, admin = false }) {
    const navigate = useNavigate(); 
    const { authState } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);
    
    // Consolidated search handler
    const handleSearch = () => {
        if (searchQuery.trim()) {
            const handler = onSearch || defaultSearch;
            handler(searchQuery);
        }
    };
    
    // Default search handler
    const defaultSearch = (query) => {
        navigate(`/discover?query=${encodeURIComponent(query)}`);
    };
    
    // Handle Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        if (onSearch && typeof onSearch === 'function') {
            onSearch(e.target.value);
        }
    };

    const handleClick = () => {
        navigate(`/modifier-${authState.role === "Expert" ? "expert" : "visiteur"}`);
    };
    
    // Handle search icon click
    const handleSearchIconClick = (e) => {
        e.stopPropagation(); // Prevent event bubbling to parent div
        handleSearch();
    }; 
    
    const title2 = title || "Rechercher un projet par mots-clés...";

    return (
        <div className="rsearch-div sticky top-0 right-0">
            <div className="rsearch-bar">
                <input
                    type="text"
                    placeholder={title2}
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="rsearch-input"
                />
                <img 
                    src={img} 
                    alt="search" 
                    className="rsearch-icon" 
                    onClick={handleSearchIconClick}
                    style={{ cursor: 'pointer' }} // Add pointer cursor
                />
            </div>
            <Pfp fixed={fixed} admin={admin} onClick={handleClick} />
        </div>
    );
}

export default SearchBar;