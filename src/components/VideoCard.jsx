import React from 'react';
import { Card } from 'react-bootstrap';
import HeartButton from '../components/HeartButton';

const VideoCard = ({ video, onClick }) => {
  const videoSrc = `data:${video.contentType};base64,${video.previewData}`;

  const handleMouseOver = (e) => {
    e.target.play();
  };

  const handleMouseOut = (e) => {
    e.target.pause();
    e.target.currentTime = 0;
  };

  return (
    <Card className="mb-3 shadow-sm" style={{ cursor: 'pointer' }}>
      <div onClick={() => onClick(video)}>
        <video
          src={videoSrc}
          className="card-img-top"
          width="100%"
          muted
          preload="metadata"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          style={{
            borderTopLeftRadius: '0.375rem',
            borderTopRightRadius: '0.375rem',
          }}
        />
      </div>
      <Card.Body className="d-flex justify-content-between align-items-start">
        <div onClick={() => onClick(video)} style={{ flex: 1 }}>
          <h6 className="fw-bold mb-1">{video.title || video.contentType}</h6>
          <p className="text-muted small mb-0">
            {video.description || video.profileName}
          </p>
        </div>
        <div>
          <HeartButton videoId={video.id} initialFavourite={video.isFavourite} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
