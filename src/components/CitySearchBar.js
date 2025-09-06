import React, { useState } from "react";

function CitySearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&format=json&apiKey=${process.env.REACT_APP_GEOAPIFY_KEY}`
      );
      const data = await res.json();

      if (data.results && data.results[0] && data.results[0].bbox) {
        const { lon1, lon2, lat1, lat2 } = data.results[0].bbox;
        onSearch({
          minLon: lon1,
          maxLat: lat2,
          maxLon: lon2,
          minLat: lat1
        });
      } else {
        alert("No bounding box found for this city");
      }
    } catch (err) {
      console.error("Error fetching city bounds:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", margin: "1rem" }}>
      <input
        type="text"
        placeholder="Enter a city (e.g. Toronto)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default CitySearchBar;
