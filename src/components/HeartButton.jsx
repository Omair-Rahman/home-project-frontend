import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const HeartButton = ({ videoId, initialFavourite }) => {
  const [isFavourite, setIsFavourite] = useState(initialFavourite);
  const [loading, setLoading] = useState(false);

  const toggleFavourite = async () => {
    try {
      setLoading(true);
      const nextFavourite = !isFavourite;

      const res = await axios.put(
        `http://localhost:5295/api/Media/${videoId}/${nextFavourite}`,
        null,
        {
          headers: {
            accept: "*/*",
          },
        }
      );

      if (res.status === 200) {
        setIsFavourite(nextFavourite);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavourite}
      disabled={loading}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: isFavourite ? "red" : "gray",
      }}
      title={isFavourite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavourite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default HeartButton;
