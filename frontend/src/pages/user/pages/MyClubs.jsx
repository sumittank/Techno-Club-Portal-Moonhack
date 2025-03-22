import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '/node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Clubs.css';


// Initial club data with member counts
const initialClubs = [
  { id: 1, name: 'Robotics Club', description: 'Explore robotics and automation.', reason: 'Learn robotics, automation, and participate in competitions.', icon: 'robot', members: 25 },
  { id: 2, name: 'Coding Club', description: 'Dive into coding and hackathons.', reason: 'Sharpen your coding skills, join hackathons, and build projects.', icon: 'laptop-code', members: 40 },
  { id: 3, name: 'Art Club', description: 'Unleash your creativity with art and design.', reason: 'Explore your artistic side and collaborate on creative projects.', icon: 'paint-brush', members: 15 },
  { id: 4, name: 'Music Club', description: 'Explore the world of music and instruments.', reason: 'Jam with fellow musicians and perform at events.', icon: 'music', members: 30 },
  { id: 5, name: 'Photography Club', description: 'Capture moments through the lens.', reason: 'Learn photography techniques and showcase your work.', icon: 'camera', members: 20 },
  { id: 6, name: 'Drama Club', description: 'Step into the spotlight and act!', reason: 'Act in plays and sharpen your theatrical skills.', icon: 'theater-masks', members: 18 },
];

const MyClubs = () => {
  // State to manage joined clubs and search
  const [joinedClubs, setJoinedClubs] = useState(initialClubs.slice(0, 3));
  const [clubs, setClubs] = useState(initialClubs);
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate unjoined clubs
  const unjoinedClubs = clubs.filter((club) => !joinedClubs.some((joined) => joined.id === club.id));

  // Join a club
  const handleJoinClub = (id) => {
    const clubToJoin = clubs.find((club) => club.id === id);
    clubToJoin.members += 1;
    setJoinedClubs([...joinedClubs, clubToJoin]);
    setClubs([...clubs]);
  };

  // Leave a club
  const handleLeaveClub = (id) => {
    const updatedClubs = joinedClubs.filter((club) => club.id !== id);
    const clubToLeave = clubs.find((club) => club.id === id);
    clubToLeave.members -= 1;
    setJoinedClubs(updatedClubs);
    setClubs([...clubs]);
  };

  // Filter clubs based on search
  const filteredJoinedClubs = joinedClubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUnjoinedClubs = unjoinedClubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      {/* Page Title */}
      <div className="text-center mb-5 page-title">
  <h1 className="display-4 text-black">My Clubs</h1>
  <hr className="w-25 mx-auto" />
</div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Joined Clubs Section */}
      <h2 className="text-black mb-3">Joined Clubs</h2>
      {filteredJoinedClubs.length === 0 ? (
        <div className="alert alert-warning text-center">
          You haven't joined any clubs yet!
        </div>
      ) : (
        <div className="row mb-5">
          {filteredJoinedClubs.map((club) => (
            <div key={club.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100 border-primary club-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">
                    <i className={`fas fa-${club.icon} me-2`}></i>
                    {club.name}
                  </h5>
                  <p className="card-text">{club.description}</p>
                  <p className="text-muted">
                    Members: <strong>{club.members}</strong>
                  </p>
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => handleLeaveClub(club.id)}
                  >
                    Leave Club
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Other Clubs Section */}
      <h2 className="text-black mb-3">Other Clubs</h2>
      {filteredUnjoinedClubs.length === 0 ? (
        <div className="alert alert-info text-center">
          No more clubs to join!
        </div>
      ) : (
        <div className="row">
          {filteredUnjoinedClubs.map((club) => (
            <div key={club.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100 border-success club-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-success">
                    <i className={`fas fa-${club.icon} me-2`}></i>
                    {club.name}
                  </h5>
                  <p className="card-text">{club.description}</p>
                  <div className="alert alert-info p-2 mt-2">
                    <strong>Why Join?</strong> {club.reason}
                  </div>
                  <p className="text-muted">
                    Members: <strong>{club.members}</strong>
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleJoinClub(club.id)}
                  >
                    Join Club
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClubs;
