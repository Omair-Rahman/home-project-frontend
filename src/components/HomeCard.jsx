import React, { useState } from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import UpdateProfileModal from '../components/UpdateProfileModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import HomeDetailPanel from '../components/HomeDetailPanel';
import axios from 'axios';

const HomeCard = ({ profiles = [], onProfileClick, onProfileUpdated }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const handleProfileClick = (profile) => {
    setSelectedProfileId(profile.id);
    setShowDetail(true);
  };

  const handleEditClick = (profile) => {
    setSelectedProfile(profile);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (profile) => {
    setProfileToDelete(profile);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!profileToDelete) return;
    try {
      const response = await axios.delete(
        `http://localhost:5295/api/Profile/${profileToDelete.id}`
      );
      onProfileUpdated();
    } catch (error) {
      console.error('Error deleting profile:', error);
    } finally {
      setShowDeleteModal(false);
      setProfileToDelete(null);
    }
  };

  return (
    <>
      {profiles.map((profile, index) => (
        <div
          key={index}
          className="bg-white pt-2 shadow-md rounded-2xl overflow-hidden cursor-pointer"
        >
          <Card
            className="mb-3 px-5 mx-5 hover-shadow"
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={() => handleProfileClick(profile)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.01)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Card.Body className="d-flex flex-column flex-md-row px-5 mx-5">
              <img
                src={`data:image/jpeg;base64,${profile.imageFile}`}
                alt={profile.name || 'Profile Image'}
                className="rounded float-start me-md-3 mb-3 mb-md-0"
                width="10%"
              />
              <div className="flex-fill">
                <h4 className="fw-bold mb-1">{profile.name}</h4>
                <div className="text-muted mb-2">
                  <Badge bg="info">{profile.rating ?? 'N/A'}/5</Badge>
                </div>
              </div>
              <div className="text-md-end text-start">
                <div className="my-2 text-muted small">
                  <Badge bg="info">{profile.profileUrl || 'No URL'}</Badge>
                </div>

                <Button
                  variant="outline-warning"
                  size="sm"
                  className="mt-2 text-uppercase fw-bold me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(profile);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mt-2 text-uppercase fw-bold me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(profile);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}

      {selectedProfile && (
        <UpdateProfileModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          profile={selectedProfile}
          onProfileUpdated={() => {
            setShowUpdateModal(false);
            onProfileUpdated();
          }}
        />
      )}

      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
        profileName={profileToDelete?.name}
      />

      <HomeDetailPanel
        show={showDetail}
        handleClose={() => setShowDetail(false)}
        profileId={selectedProfileId}
        onProfileClick={onProfileClick}
      />
    </>
  );
};

export default HomeCard;
