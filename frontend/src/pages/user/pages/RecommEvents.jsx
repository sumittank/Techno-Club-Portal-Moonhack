import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecommEvents() {
  const recommendedEvents = [
    {
      name: 'Tech Innovators Summit',
      description: 'Join tech enthusiasts and innovators to explore emerging technologies.',
      date: '2025-04-15',
      club: 'Tech Club',
      imageUrl: 'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'AI & Machine Learning Workshop',
      description: 'Hands-on session covering the latest advancements in AI and ML.',
      date: '2025-05-10',
      club: 'AI Society',
      imageUrl: 'https://images.pexels.com/photos/3912956/pexels-photo-3912956.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Coding Hackathon',
      description: 'Compete with top coders in a 24-hour coding marathon!',
      date: '2025-06-20',
      club: 'Coding Club',
      imageUrl: 'https://images.pexels.com/photos/1181317/pexels-photo-1181317.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Robotics Expo',
      description: 'Showcase of cutting-edge robotics projects by club members.',
      date: '2025-04-25',
      club: 'Robotics Club',
      imageUrl: 'https://images.pexels.com/photos/595805/pexels-photo-595805.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Cybersecurity Awareness Day',
      description: 'Learn about the latest trends in cybersecurity and ethical hacking.',
      date: '2025-07-05',
      club: 'Cybersecurity Club',
      imageUrl: 'https://images.pexels.com/photos/593579/pexels-photo-593579.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Game Development Bootcamp',
      description: 'Design and build games with industry experts in this interactive workshop.',
      date: '2025-08-12',
      club: 'Game Dev Club',
      imageUrl: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-primary">Recommended Club Events</h1>
      </div>

      {/* Event Cards */}
      <div className="row g-4">
        {recommendedEvents.map((event, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-lg event-card">
              <img
                src={event.imageUrl}
                alt={event.name}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Club Name:</strong> {event.club}</p>
                <button className="btn btn-primary w-100">Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hover effect styling */}
      <style>
        {`
          .event-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            transform-origin: center;
          }
          .event-card:hover {
            transform: perspective(1000px) translateZ(15px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
}

export default RecommEvents;
