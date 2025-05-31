import React from "react";
import { Button } from "react-bootstrap";
import HomeCard from "../components/HomeCard";

const MainContent = ({ onHomeClick }) => {
  const homes = [
    {
      name: "Elizabeth Washington",
      description:
        "Experienced educator and lover of all things science and outdoors.",
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
      {homes.map((t, i) => (
        <HomeCard home={t} key={i} onClick={onHomeClick} />
      ))}
    </div>
  );
};

export default MainContent;