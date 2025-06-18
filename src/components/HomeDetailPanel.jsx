import React, { useEffect, useState } from 'react';
import { Offcanvas, Image, Spinner, Badge, Button } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../components/Loading';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const HomeDetailPanel = ({ show, handleClose, profileId, onProfileClick }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileId) return;

    setLoading(true);
    
    axios
      .get(`http://localhost:5295/api/Profile/${profileId}/details`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error('Failed to fetch profile detail', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [profileId]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Profile Detail</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {loading ? (
          <div className="text-center mt-5">
            {/* <Spinner animation="border" /> */}
            <Loading />
          </div>
        ) : data ? (
          <>
            <Button
              variant="outline-warning"
              size="sm"
              className="mt-2 text-uppercase fw-bold me-2"
              onClick={(e) => {
                onProfileClick(data.id);
              }}
            >
              Go to Video Gallery
            </Button>
            <div className="text-center mb-4">
              <Image
                src={`data:image/jpeg;base64,${data.imageFile}`}
                alt={data.name || 'Profile Image'}
                className="rounded me-md-3 mb-3 mb-md-0"
                width="50%"
                height="30%"
              />
              <h4 className="mt-3 fw-bold">{data.name}</h4>
              <div className="text-muted">
                <Badge bg="info">Rating: {data.rating}/5</Badge>
              </div>
              <div className="text-muted mt-2">
                <Badge bg="secondary">Total Videos: {data.totalMediaContents}</Badge>
              </div>
            </div>

            <h5 className="text-center mb-3">Video Ratings Chart</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalMediaContents" fill="#0d6efd" />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="text-danger text-center">No data found.</div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default HomeDetailPanel;
