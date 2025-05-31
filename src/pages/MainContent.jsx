import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "react-bootstrap";
import HomeCard from "../components/HomeCard";

const MainContent = ({ onHomeClick }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5295/api/Profile?IsActive=true&PageNumber=1&ItemsPerPage=100'
                );
                setProfiles(response.data.items);
            } catch (error) {
                console.error('Failed to fetch profiles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) {
        return <div className="p-4 text-center">Loading profiles...</div>;
    }
    
    console.log("->", profiles)
    const homes = [
        {
            name: "Elizabeth Washington",
            description: "Experienced educator and lover of all things science and outdoors.",
            subjects: ["biology", "chemistry", "science"],
            rate: "$40",
            image: "https://randomuser.me/api/portraits/women/10.jpg",
            location: "Denver, CO",
        },
        {
            name: "Sarah Putrie",
            description: "Loves helping kids in science and biology.",
            subjects: ["science", "biology"],
            rate: "$35",
            image: "https://randomuser.me/api/portraits/women/11.jpg",
            location: "Portland, OR",
        },
    ];

    return (
        <div className="p-4">
            <h5 className="fw-bold mb-4">Let's find a home for Michelle</h5>
            <div className="mb-3 d-flex flex-wrap gap-2">
                <Button variant="outline-primary">Subject is 'Biology'</Button>
                <Button variant="outline-primary">Online</Button>
                <Button variant="outline-primary">Pay is &lt;=$40/hr</Button>
            </div>
            {/* {homes.map((t, i) => (
                <HomeCard home={t} key={i} onClick={onHomeClick} />
            ))} */}

                <HomeCard profiles={profiles}  onClick={onHomeClick} />
        </div>
    );
};

export default MainContent;