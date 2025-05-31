import React from "react";
import { Card, Badge } from "react-bootstrap";

const HomeCard = ({ profiles = [], onClick }) => (
    <>
    {
        profiles.map((profile, index) => (
            <div key={index}
                className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => onClick(profile)}>
                <Card className="mb-3" onClick={() => onClick(home)} style={{ cursor: "pointer" }}>
                    <Card.Body className="d-flex flex-column flex-md-row">
                        <img
                            src={`data:image/jpeg;base64,${profile.imageFile}`}
                            alt={profile.image}
                            className="rounded-circle me-md-3 mb-3 mb-md-0"
                            width="60"
                        />
                        <div className="flex-fill">
                            <h6 className="fw-bold mb-1">{profile.name}</h6>
                            {/* <div className="text-muted mb-2">{home.description}</div>
                            <div>
                                {home.subjects.map((s, i) => (
                                    <Badge key={i} bg="secondary" className="me-1">
                                        {s}
                                    </Badge>
                                ))}
                            </div> */}
                        </div>
                        <div className="text-md-end text-start">
                            <Badge bg="info">{profile.rating}/hr</Badge>
                            <div className="mt-2 text-muted small">{profile.profileUrl}</div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        ))
    }
    </>
);

export default HomeCard;