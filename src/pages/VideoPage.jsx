import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';
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
      try {
        const url = profileId
          ? `http://localhost:5295/api/Media/contents/${profileId}`
          : `http://localhost:5295/api/Media/contents`;

        const res = await axios.get(url);
        setVideos(res.data.data || []);
      } catch (err) {
        console.error('Video fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [profileId]);
  // const fetchVideos = async () => {
  //     setLoading(true);
  //     try {
  //         const url = profileId
  //             ? `http://localhost:5295/api/Media/contents/${profileId}`
  //             : `http://localhost:5295/api/Media/contents`;

  //         const response = await axios.get(url);

  //         if (response.data?.status) {
  //             setVideos(response.data.data || []);
  //         } else {
  //             console.error("Failed to fetch videos:", response.data?.message);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching videos:", error);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

  // useEffect(() => {
  //     fetchVideos();
  // }, [profileId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowDetail(true);
  };

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">Video Gallery</h5>
      {loading ? (
        // <Spinner animation="border" />
        <Loading />
      ) : videos.length === 0 ? (
        <div className="text-muted mt-3">No videos found.</div>
      ) : (
        <>
          <div className="p-4">
            <h5 className="fw-bold mb-4">Video Gallery</h5>
            <Row className="d-flex flex-wrap">
              {videos.map((video) => (
                <Col key={video.id} xs={12} sm={6} md={4} lg={3}>
                  <VideoCard video={video} onClick={handleVideoClick} />
                </Col>
              ))}
            </Row>
          </div>
        </>
        // videos.map((v, i) => <VideoCard key={i} video={v} onClick={handleVideoClick} />)
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
