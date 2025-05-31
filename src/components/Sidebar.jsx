import React from "react";
import { Nav, ListGroup } from "react-bootstrap";

const Sidebar = () => (
  <div className="bg-primary text-white p-3 h-100">
    <div className="mb-4">
      <h5 className="fw-bold">HOMEhub</h5>
    </div>
    <div className="mb-3">
      <img
        src="https://randomuser.me/api/portraits/women/1.jpg"
        alt="Michelle"
        className="rounded-circle mb-2"
        width="50"
      />
      <div>Michelle</div>
      <small>8th grade</small>
    </div>
    <Nav className="flex-column">
      <Nav.Link className="text-white">Schedule</Nav.Link>
      <Nav.Link className="text-white">Grades</Nav.Link>
      <Nav.Link className="text-white fw-bold">Homes</Nav.Link>
    </Nav>
    <hr className="border-white" />
    {/* <h6>COURSES</h6>
    <ListGroup variant="flush">
      {[
        "Biology",
        "Algebra I",
        "American History",
        "Social Science",
        "French",
        "English",
        "Typing",
      ].map((course, idx) => (
        <ListGroup.Item key={idx} className="bg-transparent text-white px-0">
          {course}
        </ListGroup.Item>
      ))}
    </ListGroup> */}
  </div>
);

export default Sidebar;