import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import VideoCard from "../components/VideoCard";
import VideoDetailPanel from "../components/VideoDetailPanel";

const VideoPage = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchVideos = async (author = null) => {
        setLoading(true);
        let url = "https://your-backend-api.com/videos";
        if (author) url += `?author=${encodeURIComponent(author)}`;

        const res = await fetch(url);
        const data = await res.json();
        setVideos(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setShowDetail(true);
    };

    const handleLoadAuthorVideos = (author) => {
        fetchVideos(author);
        setShowDetail(false);
    };

    return (
        <div className="p-4">
            <h5 className="fw-bold mb-4">Video List</h5>
            {loading ? (
                <Spinner animation="border" />
            ) : (
                videos.map((v, i) => <VideoCard key={i} video={v} onClick={handleVideoClick} />)
            )}
            <VideoDetailPanel
                show={showDetail}
                onHide={() => setShowDetail(false)}
                video={selectedVideo}
                onLoadAuthorVideos={handleLoadAuthorVideos}
            />
        </div>
    );
};

export default VideoPage;
