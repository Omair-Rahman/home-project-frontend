import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import VideoCard from '../components/VideoCard';
import VideoDetailPanel from '../components/VideoDetailPanel';
import Loading from '../components/Loading';

const VideoPage = ({ profileId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const url = profileId
          ? `http://localhost:5295/api/Media/contents/${profileId}`
          : `http://localhost:5295/api/Media/contents`;

        const res = await axios.get(url);
        if (res.data?.status) {
          setVideos(res.data.data || []);
        } else {
          console.error("API responded with error:", res.data?.message);
        }
      } catch (err) {
        console.error('Video fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [profileId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowDetail(true);
  };

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">Video Gallery</h5>

      {loading ? (
        <Loading />
      ) : videos.length === 0 ? (
        <div className="text-muted mt-3">No videos found.</div>
      ) : (
        <Row className="d-flex flex-wrap">
          {videos.map((video) => (
            <Col key={video.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <VideoCard video={video} onClick={handleVideoClick} />
            </Col>
          ))}
        </Row>
      )}

      <VideoDetailPanel
        show={showDetail}
        onHide={() => setShowDetail(false)}
        video={selectedVideo}
      />
    </div>
  );
};

export default VideoPage;
