import React, { useEffect, useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import axios from "axios";

const VideoDetailPanel = ({ show, onHide, videoId }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoId) {
      setVideo(null);
      return;
    }

    const fetchVideo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5295/api/Media/full/content/${videoId}`
        );

        if (response.data.status) {
          setVideo(response.data.data);
        } else {
          console.error("API responded with an error:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (!videoId || (!video && !loading)) return null;

  const videoSrc = video ? `http://localhost:5295${video.fullPath}` : "";

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="wide-offcanvas"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {video?.title || `Video ID #${video?.id || videoId}`}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {loading ? (
          <p>Loading video details...</p>
        ) : (
          <>
            {video?.description && <p className="mb-3">{video.description}</p>}
            <p className="mb-3">
              <strong>Uploaded by:</strong> {video?.profileName || "Unknown"}
            </p>

            <video
              controls
              width="100%"
              src={videoSrc}
              type={video?.contentType}
            >
              Your browser does not support the video tag.
            </video>

            <Button
              variant="primary"
              className="mt-3"
              disabled={!video?.profileId}
              onClick={() => {
                console.log(`Load more from profile ID: ${video.profileId}`);
              }}
            >
              View more from {video?.profileName || "Unknown"}
            </Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default VideoDetailPanel;
