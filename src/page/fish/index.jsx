// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import api from "../../config/axios";
import "./index.scss";
import Header from "../../component/header";

const FishMenu = () => {
  const [fishData, setFishData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("kois")
      .then((response) => {
        setFishData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading fish data: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <div className="fish-menu">
        {fishData.length > 0 ? (
          fishData.map((fish) => (
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
              <p className={`status ${fish.status === "Sold" ? "sold" : ""}`}>
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
          <p>No fish available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default FishMenu;
