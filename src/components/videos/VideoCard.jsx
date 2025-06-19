import React, { useMemo, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Mic, MicOff } from "lucide-react";
import HeartButton from "../common/HeartButton";

const VideoCard = ({ video, onClick }) => {
  const [isMuted, setIsMuted] = useState(true);
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

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
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
          muted={isMuted}
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
        <Button
          variant="light"
          size="sm"
          className="position-absolute top-0 end-0 m-2 p-1"
          onClick={toggleMute}
        >
          {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
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
