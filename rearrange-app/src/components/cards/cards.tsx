import React, { useState } from "react";
import { CardProps } from "../../interfaces";

const Card: React.FC<CardProps> = ({ document }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading with a delay
  const handleImageLoad = () => setLoading(false);

  return (
    <div className="card">
      {loading && <div className="spinner">Loading...</div>}
      <img
        src={`https://via.placeholder.com/150?text=${document.title}`}
        alt={document.title}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
      <h3>{document.title}</h3>
    </div>
  );
};

export default Card;