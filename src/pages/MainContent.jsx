import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spinner, Form } from "react-bootstrap";
import HomeCard from "../components/HomeCard";
import { motion } from "framer-motion";
import CreateProfileModal from '../components/CreateProfileModal';

const MainContent = ({ onHomeClick }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5295/api/Profile', {
                params: {
                    IsActive: true,
                    PageNumber: pageNumber,
                    ItemsPerPage: itemsPerPage
                }
            });

            const { items, totalPages } = response.data;
            setProfiles(items);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Failed to fetch profiles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, [pageNumber, itemsPerPage]);

    const resetPagination = () => {
        setPageNumber(1);
        setItemsPerPage(10);
        setTimeout(fetchProfiles, 0);
    };

    return (
        <div className="p-4">
            <h5 className="fw-bold mb-4">Let's find a home feature...</h5>
            <div className="p-2">
                <Button
                    variant="outline-primary"
                    className="text-uppercase fw-bold"
                    onClick={() => setShowModal(true)}>
                    Create Profile
                </Button>
            </div>

            <CreateProfileModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                onProfileCreated={fetchProfiles}
            />

            <motion.div
                className="d-flex flex-wrap align-items-center gap-3 mb-4 p-3 bg-light rounded-3 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="d-flex align-items-center gap-2">
                    <Form.Label className="mb-0 fw-semibold">Items per page:</Form.Label>
                    <Form.Select
                        style={{ width: "100px", minWidth: "100px" }}
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(parseInt(e.target.value));
                            setPageNumber(1); // reset to page 1 on change
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </Form.Select>
                </div>

                <div className="d-flex gap-2">
                    <Button
                        variant="outline-primary"
                        className="text-uppercase fw-bold"
                        onClick={resetPagination}>
                        Reset
                    </Button>
                    <Button
                        variant="outline-success"
                        className="text-uppercase fw-bold"
                        onClick={fetchProfiles}>
                        Refresh
                    </Button>
                </div>

                <div className="ms-auto d-flex align-items-center gap-2">
                    <Button
                        variant="outline-secondary"
                        disabled={pageNumber === 1}
                        className="text-uppercase fw-bold"
                        onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                    >
                        &laquo; Previous
                    </Button>
                    <motion.span
                        key={pageNumber}
                        className="text-uppercase fw-bold px-3"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        Page {pageNumber}
                    </motion.span>
                    <Button
                        variant="outline-secondary"
                        className="text-uppercase fw-bold"
                        disabled={pageNumber >= totalPages}
                        onClick={() => setPageNumber(prev => prev + 1)}
                    >
                        Next &raquo;
                    </Button>
                </div>
            </motion.div>

            {loading ? (
                <Spinner animation="border" />
            ) : (
                <HomeCard
                    profiles={profiles}
                    onClick={onHomeClick}
                    onProfileUpdated={fetchProfiles}
                />
            )}
        </div>
    );
};

export default MainContent;