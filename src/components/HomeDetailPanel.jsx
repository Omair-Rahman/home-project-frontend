import React from "react";
import { Offcanvas, Badge } from "react-bootstrap";

const HomeDetailPanel = ({ show, onHide, home }) => {
    if (!home) return null;

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{home.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <img
                    src={home.image}
                    alt={home.name}
                    className="rounded-circle mb-3"
                    width="80"
                />
                <p>{home.description}</p>
                <p>
                    <strong>Location:</strong> {home.location}
                </p>
                <p>
                    <strong>Rate:</strong> {home.rate}/hr
                </p>
                <p>
                    <strong>Subjects:</strong>
                </p>
                {home.subjects.map((s, i) => (
                    <Badge key={i} bg="secondary" className="me-1">
                        {s}
                    </Badge>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default HomeDetailPanel;