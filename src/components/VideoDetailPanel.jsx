import React, { useEffect, useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

const VideoDetailPanel = ({ show, onHide, video }) => {
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        if (!video) {
            setVideoUrl(null);
            return;
        }

        // Fetch video content as Blob from your API
        const fetchVideoContent = async () => {
            try {
                // `https://your-backend-api.com/full/content/${video.id}`
                const response = await fetch(`http://localhost:5295/api/Media/full/content/1`);
                if (!response.ok) throw new Error("Failed to fetch video content");

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
            } catch (error) {
                console.error(error);
                setVideoUrl(null);
            }
        };

        fetchVideoContent();

        // Cleanup: revoke object URL when component unmounts or video changes
        return () => {
            if (videoUrl) {
                URL.revokeObjectURL(videoUrl);
                setVideoUrl(null);
            }
        };
    }, [video]);

    if (!video) return null;

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" className="wide-offcanvas">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{video.title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p className="mb-3">{video.description}</p>
                <p className="mb-3">
                    <strong>Author:</strong> {video.author || "Unknown"}
                </p>

                {videoUrl ? (
                    <video controls width="100%" src={videoUrl} />
                ) : (
                    <p>Loading video...</p>
                )}

                <Button
                    variant="primary"
                    // onClick={() => onLoadAuthorVideos(video.author)}
                    disabled={!video.author}
                    className="mt-3"
                >
                    View more from {video.author || "Unknown"}
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default VideoDetailPanel;
