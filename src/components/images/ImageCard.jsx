import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { BsStars } from "react-icons/bs";
import axios from "axios";
import HeartButton from "../common/HeartButton";

const ImageCard = ({ image }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(image.rating || null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const imageSrc = `data:${image.contentType};base64,${image.fullData}`;

  const openRatingModal = () => {
    setShowModal(true);
  };

  const closeRatingModal = () => {
    setShowModal(false);
    setHoveredRating(null);
  };

  const submitRating = async () => {
    if (!selectedRating) return;
    setSubmitting(true);

    try {
      const res = await axios.put(
        `http://localhost:5295/api/Media/${image.id}/rating`,
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
      <Card className="mb-3 shadow-sm" style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={imageSrc}
          alt={image.title || "Image"}
          height="250"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex justify-content-between align-items-start">
          <div style={{ flex: 1 }}>
            <h6 className="fw-bold mb-1">{image.title || image.contentType}</h6>
            <p className="text-muted small mb-0">
              {image.description || image.profileName}
            </p>
          </div>
          <div>
            <HeartButton
              videoId={image.id}
              initialFavourite={image.isFavourite}
            />
            <Button variant="light" size="sm" onClick={openRatingModal}>
              <BsStars size={18} />
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeRatingModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate this Image</Modal.Title>
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

export default ImageCard;
