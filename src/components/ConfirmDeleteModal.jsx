import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm, profileName, deleting = false }) => {
    return (
        <Modal show={show} onHide={handleClose} centered aria-labelledby="confirm-delete-title">
            <Modal.Header closeButton>
                <Modal.Title id="confirm-delete-title">Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete <strong>{profileName || 'this profile'}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={deleting}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirm} disabled={deleting}>
                    {deleting ? 'Deleting...' : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
