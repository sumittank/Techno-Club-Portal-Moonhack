import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Clubs.css';

const SingleEventPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center single-event-container">
      {/* Page Heading */}
      <h1 className="text-black mt-5 mb-4">Club Tasks</h1>

      {/* Buttons Layout */}
      <div className="d-flex justify-content-center">
        <div className="grid-container">
          {/* Row 1 */}
          <button className="btn btn-primary" onClick={() => navigate('/clubs/explore')}>
            Explore Clubs
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/clubs/my-clubs')}>
            My Clubs
          </button>

          {/* Row 2 */}
          <button className="btn btn-primary" onClick={() => navigate('/clubs/events')}>
            Club Events
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/clubs/announcements')}>
            Announcements
          </button>

          {/* Centered Row */}
          {/* <button className="btn btn-warning center-btn" onClick={() => navigate('/book-experience')}>
            View Our Gallery
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
