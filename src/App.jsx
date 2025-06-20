import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./pages/MainContent";
import VideoPage from "./pages/VideoPage";
import ImagePage from "./pages/ImagePage";

export default function App() {
  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={12} md={2} className="bg-primary text-white">
            <Sidebar />
          </Col>
          <Col xs={12} md={10} className="bg-light min-vh-100">
            <Routes>
              <Route path="/" element={<Navigate to="/homes" replace />} />
              <Route path="/homes" element={<MainContent />} />

              {/* Video routes */}
              <Route path="/videos" element={<VideoPage />} />
              <Route path="/videos/:profileId" element={<VideoPage />} />

              {/* Image routes */}
              <Route path="/images" element={<ImagePage />} />
              <Route path="/images/:profileId" element={<ImagePage />} />

              <Route path="*" element={<Navigate to="/homes" replace />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
