import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import JellyfishSpinner from "./common/JellyfishSpinner";

const Sidebar = ({ onMenuClick, currentPage }) => (
  <div className="bg-primary text-white p-3 h-100">
    <div className="mb-4">
      <h5 className="fw-bold">HOMEhub</h5>
    </div>
    <div className="mb-3 d-flex justify-content-center">
      <JellyfishSpinner />
    </div>
    <hr className="border-white" />
    <Nav className="flex-column p-3">
      <Nav.Link
        as={NavLink}
        to="/homes"
        className={`text-uppercase fw-bold text-white`}
      >
        Homes
      </Nav.Link>
      <Nav.Link
        as={NavLink}
        to="/videos"
        className={`text-uppercase fw-bold text-white`}
      >
        Videos
      </Nav.Link>
    </Nav>
    <hr className="border-white" />
  </div>
);

export default Sidebar;
