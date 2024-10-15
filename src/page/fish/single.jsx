// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import api from "../../config/axios";
import "./Single.scss";
import Header from "../../component/header";

const SingleKoi = () => {
  const [fishData, setFishData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOption, setSortOption] = useState(""); 

  useEffect(() => {
    api
      .get("Kois")
      .then((response) => {
        setFishData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchTerm); 
    }
  };

  const filteredFishData = fishData
    .filter((fish) => fish.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "ageAsc":
          return a.age - b.age;
        case "ageDesc":
          return b.age - a.age;
        case "weightAsc":
          return a.weight - b.weight;
        case "weightDesc":
          return b.weight - a.weight;
        default:
          return 0; 
      }
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading fish data: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <h1 className="welcome-message">LIST OF SINGLE KOI FISH</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search koi by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} 
          className="search-input"
        />
        <button className="search-button" onClick={() => setSearchQuery(searchTerm)}>
          Search
        </button>
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)} 
          className="sort-select"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price ↑</option>
          <option value="priceDesc">Price ↓</option>
          <option value="ageAsc">Age: Young → Old</option>
          <option value="ageDesc">Age: Old → Young</option>
          <option value="weightAsc">Weight: Light → Heavy</option>
          <option value="weightDesc">Weight: Heavy → Light</option>
        </select>
      </div>
      <div className="fish-menu">
        {filteredFishData.length > 0 ? (
          filteredFishData.map((fish) => (
            <div key={fish.koiId} className="fish-card">
              <img src={fish.image} alt={fish.name} className="fish-image" />
              <h3>{fish.name}</h3>
              <p>
                <strong>Origin:</strong> {fish.origin}
              </p>
              <p>
                <strong>Age:</strong> {fish.age} years
              </p>
              <p>
                <strong>Weight:</strong> {fish.weight} kg
              </p>
              <p className="price">
                <strong>Price:</strong> ${fish.price}
              </p>
              <p className={`status ${fish.status === "Unavailable" ? "unavailable" : ""}`}>
                <strong>Status:</strong> {fish.status}
              </p>
              <p>
                <strong>Personality:</strong> {fish.personality}
              </p>
              <p>
                <strong>Description:</strong> {fish.description}
              </p>
            </div>
          ))
        ) : (
          <p>No fish found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default SingleKoi;
