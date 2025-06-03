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
    const [totalPages, setTotalPages] = useState(1);
    const [queryParams, setQueryParams] = useState({
        Name: '',
        Rating: '',
        PageNumber: 1,
        ItemsPerPage: 10,
        IsActive: true
    });

    const fetchProfiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5295/api/Profile', {
                params: {
                    ...queryParams,
                    Name: queryParams.Name || undefined,
                    Rating: queryParams.Rating || undefined
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
    }, [queryParams]);


    const resetPagination = () => {
        setQueryParams({
            Name: '',
            Rating: '',
            PageNumber: 1,
            ItemsPerPage: 10,
            IsActive: true
        });
    };

    console.log("<>", profiles);


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
                    <Form.Control
                        type="text"
                        placeholder="Search by name"
                        value={queryParams.Name}
                        onChange={(e) =>
                            setQueryParams((prev) => ({ ...prev, Name: e.target.value }))
                        }
                    />
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Rating"
                        min="1"
                        max="5"
                        value={queryParams.Rating}
                        onChange={(e) =>
                            setQueryParams((prev) => ({ ...prev, Rating: e.target.value }))
                        }
                    />
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Form.Label className="mb-0 fw-semibold">Items per page:</Form.Label>
                    <Form.Select
                        style={{ width: "100px", minWidth: "100px" }}
                        value={queryParams.ItemsPerPage}
                        onChange={(e) =>
                            setQueryParams((prev) => ({
                                ...prev,
                                ItemsPerPage: parseInt(e.target.value),
                                PageNumber: 1
                            }))
                        }
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
                        disabled={queryParams.PageNumber === 1}
                        onClick={() =>
                            setQueryParams((prev) => ({
                                ...prev,
                                PageNumber: Math.max(1, prev.PageNumber - 1)
                            }))
                        }
                    >
                        &laquo; Previous
                    </Button>
                    <motion.span
                        key={queryParams.PageNumber}
                        className="text-uppercase fw-bold px-3"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        Page {queryParams.PageNumber} of {totalPages}
                    </motion.span>
                    <Button
                        disabled={queryParams.PageNumber >= totalPages}
                        onClick={() =>
                            setQueryParams((prev) => ({
                                ...prev,
                                PageNumber: prev.PageNumber + 1
                            }))
                        }
                    >

                        Next &raquo;
                    </Button>
                </div>
            </motion.div>

            {loading ? (
                <Spinner animation="border" />
            ) : profiles.length === 0 ? (
                <div className="text-muted mt-3">No profiles found.</div>
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