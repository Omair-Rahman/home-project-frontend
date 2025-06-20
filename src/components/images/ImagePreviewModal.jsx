import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const ImagePreviewModal = ({
  images,
  currentIndex,
  show,
  onClose,
  setCurrentIndex,
}) => {
  const image = images[currentIndex];

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") goPrevious();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, currentIndex]);

  if (!show || !image) return null;

  const imageSrc = `data:${image.contentType};base64,${image.fullData}`;

  const goPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div
      className="picasa-viewer"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 1050,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Close Button */}
      <Button
        variant="light"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
          borderRadius: "50%",
          padding: "0.5rem 0.6rem",
        }}
      >
        <FaTimes />
      </Button>

      {/* Left Arrow */}
      <Button
        variant="dark"
        onClick={goPrevious}
        disabled={currentIndex === 0}
        style={{
          position: "absolute",
          left: 10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          fontSize: "2rem",
          opacity: currentIndex === 0 ? 0.3 : 0.8,
        }}
      >
        <FaArrowLeft />
      </Button>

      {/* Right Arrow */}
      <Button
        variant="dark"
        onClick={goNext}
        disabled={currentIndex === images.length - 1}
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          fontSize: "2rem",
          opacity: currentIndex === images.length - 1 ? 0.3 : 0.8,
        }}
      >
        <FaArrowRight />
      </Button>

      {/* Image with Zoom & Pan */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={5}
        wheel={{ step: 0.2 }}
        doubleClick={{ mode: "zoomIn" }}
        pinch={{ step: 5 }}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imageSrc}
            alt={image.title}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Info Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          color: "white",
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: "10px 15px",
          borderRadius: "8px",
          maxWidth: "80%",
        }}
      >
        <div className="fw-bold">{image.title || "Untitled Image"}</div>
        <div className="small text-light">{image.description || image.profileName}</div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
