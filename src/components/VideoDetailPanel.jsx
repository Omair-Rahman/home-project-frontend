import React from "react";
import { Offcanvas, Button } from "react-bootstrap";

const VideoDetailPanel = ({ show, onHide, video, onLoadAuthorVideos }) => {
    if (!video) return null;

    return (
        <Offcanvas show={show} onHide={onHide} placement="end" className="wide-offcanvas">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{video.title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>{video.description}</p>
                <p>
                    <strong>Author:</strong> {video.author}
                </p>
                <Button variant="primary" onClick={() => onLoadAuthorVideos(video.author)}>
                    View more from {video.author}
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default VideoDetailPanel;
