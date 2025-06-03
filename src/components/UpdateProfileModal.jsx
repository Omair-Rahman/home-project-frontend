import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateProfileModal = ({ show, handleClose, profile, onProfileUpdated }) => {
    const [formData, setFormData] = useState({
        name: '',
        rating: 0,
        profileLink: '',
        image: null,
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                rating: profile.rating || 0,
                profileLink: profile.profileUrl || '',
                image: null
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('Name', formData.name);
            data.append('Rating', formData.rating);
            data.append('ProfileUrl', formData.profileLink);

            // Conditional file and IsNew
            if (formData.image) {
                data.append('Image', formData.image);
                data.append('IsNew', true);
            } else {
                data.append('IsNew', false);
            }

            await axios.put(`http://localhost:5295/api/Profile/${profile.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            onProfileUpdated();
            handleClose();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
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
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdateProfileModal;
