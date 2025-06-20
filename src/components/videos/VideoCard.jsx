import React, { useMemo, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import axios from "axios";
import { Mic, MicOff } from "lucide-react";
import HeartButton from "../common/HeartButton";

const VideoCard = ({ video, onClick }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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

  const openRatingModal = (e) => {
    e.stopPropagation();
    setSelectedRating(video.rating || null);
    setHoveredRating(null);
    setShowModal(true);
  };

  const closeRatingModal = () => {
    setShowModal(false);
    setSelectedRating(null);
    setHoveredRating(null);
  };

  const submitRating = async () => {
    if (!selectedRating) return;
    setSubmitting(true);

    try {
      const res = await axios.put(
        `http://localhost:5295/api/Media/${video.id}/rating`,
        selectedRating,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        closeRatingModal();
      } else {
        console.error("Rating update failed");
      }
    } catch (err) {
      console.error("Rating error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
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
          className="position-relative"
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
            <Button variant="light" size="sm" onClick={openRatingModal}>
              <BsStars size={18} />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeRatingModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate this Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setSelectedRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              style={{
                cursor: "pointer",
                fontSize: "2rem",
                color:
                  hoveredRating >= star
                    ? "gold"
                    : !hoveredRating && selectedRating >= star
                    ? "gold"
                    : "lightgray",
                margin: "0 5px",
                transition: "color 0.2s",
              }}
            >
              ★
            </span>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={closeRatingModal}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={submitRating}
            disabled={!selectedRating || submitting}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VideoCard;
