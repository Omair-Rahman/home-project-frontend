import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import MainContent from "./pages/MainContent";
import HomeDetailPanel from "./components/HomeDetailPanel";

export default function App() {
  const [selectedHome, setSelectedHome] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleHomeClick = (home) => {
    setSelectedHome(home);
    setShowDetail(true);
  };

  const handleClose = () => setShowDetail(false);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={2} className="bg-primary text-white">
          <Sidebar />
        </Col>
        <Col xs={12} md={10} className="bg-light min-vh-100">
          <MainContent onHomeClick={handleHomeClick} />
        </Col>
      </Row>
      <HomeDetailPanel show={showDetail} onHide={handleClose} home={selectedHome} />
    </Container>
  );
}
