// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import api from "../../config/axios";
import "./allproduct.scss";
import Header from "../../component/header";

const AllProduct = () => {
  const [allKoiData, setAllKoiData] = useState({ koi: [], batchKoi: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [koiPageNumber, setKoiPageNumber] = useState(1);
  const [batchKoiPageNumber, setBatchKoiPageNumber] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    api
      .get("/KoiAndBatchKoi/GetAllKoiAndBatch")
      .then((response) => {
        setAllKoiData(response.data);
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

  const filteredKoiData = allKoiData.koi.filter((koi) =>
    koi.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBatchKoiData = allKoiData.batchKoi.filter((batchKoi) =>
    batchKoi.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const koiTotalPages = Math.ceil(filteredKoiData.length / pageSize);
  const displayedKoi = filteredKoiData.slice(
    (koiPageNumber - 1) * pageSize,
    koiPageNumber * pageSize
  );

  const batchKoiTotalPages = Math.ceil(filteredBatchKoiData.length / pageSize);
  const displayedBatchKoi = filteredBatchKoiData.slice(
    (batchKoiPageNumber - 1) * pageSize,
    batchKoiPageNumber * pageSize
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading koi data: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <h1 className="welcome-message">All Koi Products</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={() => setSearchQuery(searchTerm)}
        >
          Search
        </button>
      </div>

      <div className="all-products-container">
        <h2>Single Koi</h2>
        <div className="single-koi-list">
          {displayedKoi.length > 0 ? (
            displayedKoi.map((koi) => (
              <div key={koi.koiId} className="koi-card">
                <img src={koi.image} alt={koi.name} className="koi-image1" />
                <h3>{koi.name}</h3>
                <p>
                  <strong>Description:</strong> {koi.description}
                </p>
                <p>
                  <strong>Age:</strong> {koi.age} years
                </p>
                <p>
                  <strong>Weight:</strong> {koi.weight} kg
                </p>
                <p>
                  <strong>Price:</strong> ${koi.price}
                </p>
                <p>
                  <strong>Status:</strong> {koi.status}
                </p>
              </div>
            ))
          ) : (
            <p>No single koi found matching your search.</p>
          )}
        </div>

        <div className="pagination">
          {Array.from({ length: koiTotalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === koiPageNumber ? "active" : ""}
                onClick={() => setKoiPageNumber(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>

        <h2>Batch Koi</h2>
        <div className="batch-koi-list">
          {displayedBatchKoi.length > 0 ? (
            displayedBatchKoi.map((batchKoi) => (
              <div key={batchKoi.batchKoiId} className="batch-koi-card">
                <img
                  src={batchKoi.image}
                  alt={batchKoi.name}
                  className="batch-koi-image"
                />
                <h3>{batchKoi.name}</h3>
                <p>
                  <strong>Description:</strong> {batchKoi.description}
                </p>
                <p>
                  <strong>Quantity:</strong> {batchKoi.quantity}
                </p>
                <p>
                  <strong>Weight:</strong> {batchKoi.weight} kg
                </p>
                <p>
                  <strong>Price:</strong> ${batchKoi.price}
                </p>
                <p>
                  <strong>Status:</strong> {batchKoi.status}
                </p>
              </div>
            ))
          ) : (
            <p>No batch koi found matching your search.</p>
          )}
        </div>

        <div className="pagination">
          {Array.from({ length: batchKoiTotalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={pageNumber === batchKoiPageNumber ? "active" : ""}
                onClick={() => setBatchKoiPageNumber(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
