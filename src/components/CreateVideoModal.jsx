import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import Loading from "../components/Loading";
import axios from "axios";

const CreateVideoModal = ({ show, handleClose, onVideoUploaded }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [profileId, setProfileId] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:5295/api/Profile/Option");
        if (res.data?.status) {
          setProfiles(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load profiles:", err);
      } finally {
        setLoadingProfiles(false);
      }
    };

    if (show) {
      fetchProfiles();
    }
  }, [show]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleProfileChange = (e) => {
    setProfileId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !profileId) return;

    const formData = new FormData();
    formData.append("MediaFile", videoFile);

    try {
      setUploading(true);
      await axios.post(
        `http://localhost:5295/api/Media/upload?ProfileId=${profileId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
          },
        }
      );

      onVideoUploaded?.();
      handleClose();
    } catch (error) {
      console.error("Video upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Upload New Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Select Profile</Form.Label>
            {loadingProfiles ? (
              //   <Spinner animation="border" size="sm" />
              <Loading />
            ) : (
              <Form.Select
                value={profileId}
                onChange={handleProfileChange}
                required
              >
                <option value="">-- Select Profile --</option>
                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.name}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Video File</Form.Label>
            <Form.Control
              type="file"
              accept="*"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={uploading || loadingProfiles}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateVideoModal;
