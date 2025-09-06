import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [minLon, setMinLon] = useState("");
  const [maxLat, setMaxLat] = useState("");
  const [maxLon, setMaxLon] = useState("");
  const [minLat, setMinLat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (minLon && maxLat && maxLon && minLat) {
      onSearch({ minLon, maxLat, maxLon, minLat });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", margin: "1rem" }}>
      <input
        type="number"
        step="any"
        placeholder="Min Lon"
        value={minLon}
        onChange={(e) => setMinLon(e.target.value)}
      />
      <input
        type="number"
        step="any"
        placeholder="Max Lat"
        value={maxLat}
        onChange={(e) => setMaxLat(e.target.value)}
      />
      <input
        type="number"
        step="any"
        placeholder="Max Lon"
        value={maxLon}
        onChange={(e) => setMaxLon(e.target.value)}
      />
      <input
        type="number"
        step="any"
        placeholder="Min Lat"
        value={minLat}
        onChange={(e) => setMinLat(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
