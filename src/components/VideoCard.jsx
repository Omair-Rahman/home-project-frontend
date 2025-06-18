import React, { useMemo } from "react";
import { Card } from "react-bootstrap";
import HeartButton from "../components/HeartButton";

const VideoCard = ({ video, onClick }) => {
  const videoSrc = useMemo(
    () => `data:${video.contentType};base64,${video.previewData}`,
    [video]
  );

  const handleMouseOver = (e) => {
    e.target.play();
  };

  const handleMouseOut = (e) => {
    e.target.pause();
    e.target.currentTime = 0;
  };

  const handleCardClick = () => {
    onClick(video);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick(video);
    }
  };

  return (
    <Card
      className="mb-3 shadow-sm"
      style={{
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        onClick={handleCardClick}
        onKeyDown={handleKeyPress}
        role="button"
        tabIndex={0}
      >
        <video
          src={videoSrc}
          className="card-img-top"
          width="100%"
          height="250px"
          // muted
          preload="metadata"
          loading="lazy"
          aria-label={`Preview of ${video.title || "video content"}`}
          controls={false}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          style={{
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
          }}
        />
      </div>
      <Card.Body className="d-flex justify-content-between align-items-start">
        <div
          onClick={handleCardClick}
          onKeyDown={handleKeyPress}
          role="button"
          tabIndex={0}
          style={{ flex: 1 }}
        >
          <h6 className="fw-bold mb-1">{video.title || video.contentType}</h6>
          <p className="text-muted small mb-0">
            {video.description || video.profileName}
          </p>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <HeartButton
            videoId={video.id}
            initialFavourite={video.isFavourite}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
