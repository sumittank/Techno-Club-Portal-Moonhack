import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Clubs.css';

// Announcement Data
const announcements = [
  { id: 1, message: 'New Robotics competition announced!', type: 'event', date: '2025-03-30' },
  { id: 2, message: 'Coding Club meeting on Friday at 4 PM.', type: 'meeting', date: '2025-03-28' },
  { id: 3, message: 'Urgent: Art Club event rescheduled!', type: 'urgent', date: '2025-03-25' },
  { id: 4, message: 'Join the Hackathon this weekend!', type: 'event', date: '2025-04-05' },
  { id: 5, message: 'Art Club Exhibition opening soon!', type: 'info', date: '2025-04-10' }
];

// Colors for each announcement type
const typeColors = {
  event: 'primary',
  meeting: 'success',
  urgent: 'danger',
  info: 'warning'
};

// Confetti Component
const Confetti = () => (
  <div className="confetti-container">
    {Array.from({ length: 100 }).map((_, i) => (
      <div
        key={i}
        className="confetti"
        style={{
          left: `${Math.random() * 100}vw`,
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
          animationDelay: `${Math.random() * 0.2}s`,
        }}
      />
    ))}
  </div>
);

const ClubAnnouncements = () => {
  const [visible, setVisible] = useState(3); // Show only 3 initially
  const [reactions, setReactions] = useState({});
  const [confettiActive, setConfettiActive] = useState(false);

  // Countdown Timer Function
  const calculateCountdown = (date) => {
    const eventDate = new Date(date).getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft <= 0) return 'Event Started!';

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Countdown State
  const [countdowns, setCountdowns] = useState(
    announcements.reduce((acc, a) => ({ ...acc, [a.id]: calculateCountdown(a.date) }), {})
  );

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns(
        announcements.reduce((acc, a) => ({ ...acc, [a.id]: calculateCountdown(a.date) }), {})
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Reactions
  const handleReaction = (id, type) => {
    setReactions((prev) => ({
      ...prev,
      [id]: { ...prev[id], [type]: (prev[id]?.[type] || 0) + 1 }
    }));

    // Trigger confetti on reaction
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 1000); // Stop confetti after 1 second
  };

  return (
    <div className="container announcements-container">
      {/* Confetti */}
      {confettiActive && <Confetti />}

      {/* Page Title */}
      <h2 className="text-black mt-5 pt-5 text-center">Announcements</h2>

      {/* Announcements List */}
      <ul className="list-group mt-4">
        {announcements.slice(0, visible).map((a) => (
          <li key={a.id} className={`list-group-item border border-dark mb-2 d-flex flex-column`}>
            {/* Label and Message */}
            <div className="d-flex align-items-center mb-2">
              <span className={`badge bg-${typeColors[a.type]} me-3`}>{a.type.toUpperCase()}</span>
              {a.message}
            </div>

            {/* Countdown */}
            <div className="countdown text-end text-muted mb-2">
              ⏳ <strong>{countdowns[a.id]}</strong>
            </div>

            {/* Reactions */}
            <div className="reaction-buttons mt-2">
              <button className="btn btn-light btn-sm me-2" onClick={() => handleReaction(a.id, 'like')}>
                👍 {reactions[a.id]?.like || 0}
              </button>
              <button className="btn btn-light btn-sm me-2" onClick={() => handleReaction(a.id, 'love')}>
                ❤️ {reactions[a.id]?.love || 0}
              </button>
              <button className="btn btn-light btn-sm" onClick={() => handleReaction(a.id, 'fire')}>
                🔥 {reactions[a.id]?.fire || 0}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Collapsible Button */}
      {visible < announcements.length ? (
        <button className="btn btn-primary mt-3" onClick={() => setVisible(announcements.length)}>
          View More
        </button>
      ) : (
        <button className="btn btn-secondary mt-3" onClick={() => setVisible(3)}>
          Show Less
        </button>
      )}
    </div>
  );
};

export default ClubAnnouncements;
