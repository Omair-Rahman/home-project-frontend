import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import MainContent from "./pages/MainContent";
import VideoPage from "./pages/VideoPage";
import HomeDetailPanel from "./components/HomeDetailPanel";

export default function App() {
  const [selectedHome, setSelectedHome] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState("homes");

  const handleHomeClick = (home) => {
    setSelectedHome(home);
    setShowDetail(true);
  };

  const handleClose = () => setShowDetail(false);

  const renderContent = () => {
    if (page === "videos") return <VideoPage />;
    return <MainContent onHomeClick={handleHomeClick} />;
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={2} className="bg-primary text-white">
          <Sidebar onMenuClick={setPage} />
        </Col>
        <Col xs={12} md={10} className="bg-light min-vh-100">
          {renderContent()}
        </Col>
      </Row>
      <HomeDetailPanel show={showDetail} onHide={handleClose} home={selectedHome} />
    </Container>
  );
}
