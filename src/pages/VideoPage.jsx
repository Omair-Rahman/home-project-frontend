import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import VideoCard from "../components/videos/VideoCard";
import VideoDetailPanel from "../components/videos/VideoDetailPanel";
import CreateVideoModal from "../components/videos/CreateVideoModal";
import Loading from "../components/common/Loading";

const VideoPage = ({ profileId: initialProfileId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [profileOptions, setProfileOptions] = useState([]);

  const [filters, setFilters] = useState({
    profileId: initialProfileId || "",
    isFavourite: "",
    rating: "",
  });

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://localhost:5295/api/Profile/Option");
      if (res.data?.status) {
        setProfileOptions(res.data.data || []);
      }
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.profileId) params.profileId = filters.profileId;
      if (filters.isFavourite !== "") params.isFavourite = filters.isFavourite;
      if (filters.rating) params.rating = filters.rating;

      const res = await axios.get("http://localhost:5295/api/Media/contents", {
        params,
      });

      if (res.data?.status) {
        setVideos(res.data.data || []);
      } else {
        console.error("API responded with error:", res.data?.message);
      }
    } catch (err) {
      console.error("Video fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchProfiles();
  // }, []);

  // useEffect(() => {
  //   fetchVideos();
  // }, [filters.profileId]);

  useEffect(() => {
    setFilters({
      profileId: initialProfileId || "",
      isFavourite: "",
      rating: "",
    });
  }, [initialProfileId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowDetail(true);
  };

  const resetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      profileId: initialProfileId || "",
      isFavourite: "",
      rating: "",
    }));
  };

  const refresh = () => {
    fetchVideos();
  };

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">Video Gallery</h5>

      <div className="d-flex flex-wrap align-items-end gap-2 mb-3">
        <Button
          variant="outline-primary"
          className="fw-bold text-uppercase"
          onClick={() => setShowUploadModal(true)}
        >
          Upload New Video
        </Button>
      </div>

      <motion.div
        className="d-flex flex-wrap align-items-center gap-3 mb-4 pt-3 bg-light rounded-3 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Form className="mb-4">
          <Row className="g-3">
            {!initialProfileId && (
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Profile</Form.Label>
                  <Form.Select
                    value={filters.profileId}
                    onChange={(e) =>
                      setFilters({ ...filters, profileId: e.target.value })
                    }
                  >
                    <option value="">All Profiles</option>
                    {profileOptions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            <Col md={initialProfileId ? 6 : 4}>
              <Form.Group>
                <Form.Label>Favourite</Form.Label>
                <Form.Select
                  value={filters.isFavourite}
                  onChange={(e) =>
                    setFilters({ ...filters, isFavourite: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="true">Favourites</option>
                  <option value="false">Non-Favourites</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={initialProfileId ? 6 : 4}>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={filters.rating}
                  onChange={(e) =>
                    setFilters({ ...filters, rating: e.target.value })
                  }
                >
                  <option value="">All Ratings</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 && "s"}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3 d-flex gap-2">
            <Button
              variant="outline-primary"
              className="text-uppercase fw-bold"
              onClick={fetchVideos}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline-secondary"
              className="text-uppercase fw-bold"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button
              variant="outline-success"
              className="text-uppercase fw-bold"
              onClick={refresh}
            >
              Refresh
            </Button>
          </div>
        </Form>
      </motion.div>

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
        videoId={selectedVideo?.id}
      />

      <CreateVideoModal
        show={showUploadModal}
        handleClose={() => setShowUploadModal(false)}
        onVideoUploaded={fetchVideos}
      />
    </div>
  );
};

export default VideoPage;
