import React from "react";
import { Card, Badge } from "react-bootstrap";

const HomeCard = ({ home, onClick }) => (
  <Card className="mb-3" onClick={() => onClick(home)} style={{ cursor: "pointer" }}>
    <Card.Body className="d-flex flex-column flex-md-row">
      <img
        src={home.image}
        alt={home.name}
        className="rounded-circle me-md-3 mb-3 mb-md-0"
        width="60"
      />
      <div className="flex-fill">
        <h6 className="fw-bold mb-1">{home.name}</h6>
        <div className="text-muted mb-2">{home.description}</div>
        <div>
          {home.subjects.map((s, i) => (
            <Badge key={i} bg="secondary" className="me-1">
              {s}
            </Badge>
          ))}
        </div>
      </div>
      <div className="text-md-end text-start">
        <Badge bg="info">{home.rate}/hr</Badge>
        <div className="mt-2 text-muted small">{home.location}</div>
      </div>
    </Card.Body>
  </Card>
);

export default HomeCard;