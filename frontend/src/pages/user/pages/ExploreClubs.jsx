import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Clubs.css';

const clubsData = [
  { id: 1, name: 'Robotics Club', description: 'Explore robotics and automation.' },
  { id: 2, name: 'Coding Club', description: 'Dive into coding and hackathons.' },
  { id: 3, name: 'Art Club', description: 'Unleash your creativity with art.' }
];

const ExploreClubs = ({ onJoin }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredClubs = clubsData.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoin = (id) => {
    onJoin(id); // Add to joined clubs
    navigate('/clubs/my-clubs'); // Redirect to My Clubs page
  };

  return (
    <div className="container">
      {/* Page Title */}
      <div className="page-title">
        <h2 className="text-black">Explore Clubs</h2>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search Clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Clubs List */}
      <div className="d-flex flex-wrap justify-content-center">
        {filteredClubs.map((club) => (
          <div key={club.id} className="club-card">
            <h5 className="club-name">{club.name}</h5>
            <p className="club-description">{club.description}</p>
            <button className="btn btn-primary join-btn" onClick={() => handleJoin(club.id)}>
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreClubs;
