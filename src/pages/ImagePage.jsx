import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import Loading from "../components/common/Loading";
import ImageCard from "../components/images/ImageCard";
import CreateImageModal from "../components/images/CreateImageModal";

const ImagePage = () => {
  const navigate = useNavigate();
  const { profileId: paramProfileId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileOptions, setProfileOptions] = useState([]);

  const [filters, setFilters] = useState({
    profileId: paramProfileId || "",
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

  const fetchImages = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.profileId) params.profileId = filters.profileId;
      if (filters.isFavourite !== "") params.isFavourite = filters.isFavourite;
      if (filters.rating) params.rating = filters.rating;

      const res = await axios.get(
        "http://localhost:5295/api/Media/image/contents",
        {
          params,
        }
      );

      if (res.data?.status) {
        setImages(res.data.data || []);
      } else {
        console.error("API responded with error:", res.data?.message);
      }
    } catch (err) {
      console.error("Image fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    setFilters({
      profileId: paramProfileId || "",
      isFavourite: "",
      rating: "",
    });
    fetchImages();
  }, [paramProfileId]);

  const resetFilters = () => {
    setFilters((prev) => ({
      ...prev,
      profileId: paramProfileId || "",
      isFavourite: "",
      rating: "",
    }));
  };

  const refresh = () => {
    fetchImages();
  };

  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      <Button
        variant="link"
        className="text-uppercase fw-bold"
        onClick={() => navigate("/homes")}
      >
        &larr; Back to Homes
      </Button>

      <div className="p-4">
        <h5 className="fw-bold mb-4">Image Gallery</h5>

        <div className="d-flex flex-wrap align-items-end gap-2 mb-3">
          <Button
            variant="outline-primary"
            className="fw-bold text-uppercase"
            onClick={() => setShowUploadModal(true)}
          >
            Upload New Image
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
              {!paramProfileId && (
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

              <Col md={paramProfileId ? 6 : 4}>
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

              <Col md={paramProfileId ? 6 : 4}>
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
                onClick={fetchImages}
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
        ) : images.length === 0 ? (
          <div className="text-muted mt-3">No images found.</div>
        ) : (
          <Row className="d-flex flex-wrap">
            {images.map((image) => (
              <Col key={image.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ImageCard image={image} />
              </Col>
            ))}
          </Row>
        )}

        <CreateImageModal
          show={showUploadModal}
          handleClose={() => setShowUploadModal(false)}
          onImageUploaded={fetchImages}
        />
      </div>
    </>
  );
};

export default ImagePage;
