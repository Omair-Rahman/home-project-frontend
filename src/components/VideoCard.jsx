import React from "react";
import { Card } from "react-bootstrap";

const VideoCard = ({ video, onClick }) => (
    <Card className="mb-3" onClick={() => onClick(video)} style={{ cursor: "pointer" }}>
        <Card.Body>
            <h6 className="fw-bold">{video.title}</h6>
            <p className="text-muted small">{video.description}</p>
        </Card.Body>
    </Card>
);

export default VideoCard;