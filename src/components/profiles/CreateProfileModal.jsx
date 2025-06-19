import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateProfileModal = ({ show, handleClose, onProfileCreated }) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    profileLink: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('rating', formData.rating);
      data.append('profileLink', formData.profileLink);
      data.append('image', formData.image);

      await axios.post('http://localhost:5295/api/Profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onProfileCreated();
      handleClose();
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!show) {
      setFormData({
        name: '',
        rating: 0,
        profileLink: '',
        image: null,
      });
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Create Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Link</Form.Label>
            <Form.Control
              type="url"
              name="profileLink"
              value={formData.profileLink}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              {formData.image ? formData.image.name : 'No file selected'}
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateProfileModal;
