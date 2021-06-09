import React from "react";
import "./SearchResults.css";

function SearchResults(props) {
  console.log("SearchResult rendered!");
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {props.children}
    </div>
  );
}

export default SearchResults;
