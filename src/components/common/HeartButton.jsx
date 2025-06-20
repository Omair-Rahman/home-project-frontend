import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const HeartButton = ({ videoId, initialFavourite }) => {
  const [isFavourite, setIsFavourite] = useState(initialFavourite);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFavourite(initialFavourite);
  }, [initialFavourite]);

  const toggleFavourite = async () => {
    const nextFavourite = !isFavourite;
    setIsFavourite(nextFavourite);
    setLoading(true);

    try {
      const res = await axios.put(
        `http://localhost:5295/api/Media/${videoId}/isFavourite`,
        nextFavourite,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status !== 200) throw new Error("Update failed");
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      setIsFavourite(!nextFavourite);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavourite}
      disabled={loading}
      aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
      title={isFavourite ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: "transparent",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        fontSize: "1.5rem",
        color: isFavourite ? "red" : "gray",
        opacity: loading ? 0.6 : 1,
        transition: "transform 0.2s",
        transform: isFavourite ? "scale(1.2)" : "scale(1)",
      }}
    >
      {isFavourite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default HeartButton;
