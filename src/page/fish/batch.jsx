// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import api from "../../config/axios";
import "./batch.scss";
import Header from "../../component/header";

const BatchKoi = () => {
  const [batchKoiData, setBatchKoiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOption, setSortOption] = useState("priceAsc"); 

  useEffect(() => {
    api
      .get("/BatchKoi/GetBatchKoi") 
      .then((response) => {
        setBatchKoiData(response.data);
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

  const filteredBatchKoiData = batchKoiData
    .filter((batch) => batch.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case "priceAsc":
          return a.price - b.price; 
        case "priceDesc":
          return b.price - a.price; 
        case "quantityAsc":
          return a.quantity - b.quantity; 
        case "quantityDesc":
          return b.quantity - a.quantity;
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
    return <div>Error loading batch koi data: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <h1 className="welcome-message">LIST OF BATCH KOI FISH</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search batch koi by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} 
          className="search-input"
        />
        <button className="search-button" onClick={() => setSearchQuery(searchTerm)}>
          Search
        </button>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
          <option value="">Sort By</option>
          <option value="priceAsc">Price ↑</option>
          <option value="priceDesc">Price ↓</option>
          <option value="weightAsc">Weight: Light → Heavy</option>
          <option value="weightDesc">Weight: Heavy → Light</option>
          <option value="quantityAsc">Quantity: ↑</option>
          <option value="quantityDesc">Quantity: ↓</option>          
        </select>
      </div>
      <div className="batch-koi-menu">
        {filteredBatchKoiData.length > 0 ? (
          filteredBatchKoiData.map((batch) => (
            <div key={batch.batchKoiId} className="batch-koi-card">
              <img src={batch.image} alt={batch.name} className="batch-koi-image" />
              <h3 className="batch-koi-name">{batch.name}</h3>
              <p className="batch-koi-description">
                <strong>Description:</strong> {batch.description}
              </p>
              <p>
                <strong>Quantity:</strong> {batch.quantity}
              </p>
              <p>
                <strong>Weight:</strong> {batch.weight} kg
              </p>
              <p>
                <strong>Origin:</strong> {batch.origin}
              </p>
              <p className={`status ${batch.status.toLowerCase()}`}>
                <strong>Status:</strong> {batch.status}
              </p>
              <p>
                <strong>Personality:</strong> {batch.personality}
              </p>
              <p>
                <strong>Price:</strong> ${batch.price}
              </p>
            </div>
          ))
        ) : (
          <p>No batch koi found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default BatchKoi;
