import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [term, setTerm] = useState("");
  const search = () => {
    props.onSearch(term);
    setTerm("");
  };

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  console.log("SearchBar rendered!");
  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={term}
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
