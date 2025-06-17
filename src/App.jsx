import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import MainContent from './pages/MainContent';
import VideoPage from './pages/VideoPage';

export default function App() {
  const [page, setPage] = useState('homes');
  const [profileId, setProfileId] = useState(null);

  const handleHomeClick = (profileId) => {
    setProfileId(profileId);
    setPage('videos');
  };

  const renderContent = () => {
    if (page === 'videos') return <VideoPage profileId={profileId} />;
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
    </Container>
  );
}
