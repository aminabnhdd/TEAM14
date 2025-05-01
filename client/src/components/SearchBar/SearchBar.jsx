import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || "";
  const [query, setQuery] = useState(initialQuery);

  // Update URL when query changes (with debounce to avoid too many updates)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setSearchParams({ query: query.trim() });
      } else {
        setSearchParams({});
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Pass search query to parent component
  };

  return (
    <div className="search-div">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par mots-clés..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <div></div>
        <FaSearch className="search-icon" /> 
      </div>
    </div>
  );
}

export default SearchBar;