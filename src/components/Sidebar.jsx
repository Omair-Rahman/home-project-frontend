import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ onMenuClick }) => (
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
    <Nav className="flex-column p-3">
      <Nav.Link
        className="text-uppercase text-white fw-bold"
        onClick={() => onMenuClick("homes")}>
        Homes
      </Nav.Link>
      <Nav.Link
        className="text-uppercase text-white fw-bold"
        onClick={() => onMenuClick("videos")}>
        Videos
      </Nav.Link>

    </Nav>
    <hr className="border-white" />
  </div>
);

export default Sidebar;