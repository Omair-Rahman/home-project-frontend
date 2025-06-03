import React, { useState } from 'react';
import { Card, Badge, Button } from "react-bootstrap";
import UpdateProfileModal from "../components/UpdateProfileModal";

const HomeCard = ({ profiles = [], onClick, onProfileUpdated }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleEditClick = (profile) => {
        setSelectedProfile(profile);
        setShowUpdateModal(true);
    };

    return (
        <>
            {
                profiles.map((profile, index) => (
                    <div key={index}
                        className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer"
                    >
                        <Card className="mb-3 px-5 mx-5" style={{ cursor: "pointer" }}>
                            <Card.Body className="d-flex flex-column flex-md-row px-5 mx-5">
                                <img
                                    src={`data:image/jpeg;base64,${profile.imageFile}`}
                                    alt={profile.image}
                                    className="rounded float-start me-md-3 mb-3 mb-md-0"
                                    width="10%"
                                />
                                <div className="flex-fill">
                                    <h4 className="fw-bold mb-1">{profile.name}</h4>
                                    <div className="text-muted mb-2">
                                        <Badge bg="info">{profile.rating}/5</Badge>
                                    </div>
                                </div>
                                <div className="text-md-end text-start">
                                    <div className="my-2 text-muted small">
                                        <Badge bg="info">{profile.profileUrl}</Badge>
                                    </div>

                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        className="mt-2 text-muted small"
                                        onClick={() => handleEditClick(profile)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            }

            {selectedProfile && (
                <UpdateProfileModal
                    show={showUpdateModal}
                    handleClose={() => setShowUpdateModal(false)}
                    profile={selectedProfile}
                    onProfileUpdated={() => {
                        setShowUpdateModal(false);
                        onProfileUpdated();
                    }}
                />
            )}
        </>
    );
};

export default HomeCard;