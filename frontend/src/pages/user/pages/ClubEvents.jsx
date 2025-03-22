import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Clubs.css';

const clubsWithEvents = [
  {
    clubName: 'Robotics Club',
    events: [
      {
        id: 1,
        title: 'Robotics Workshop',
        date: '2025-03-30',
        description: 'Hands-on session to build and program robots. Learn about automation and participate in exciting challenges!'
      },
      {
        id: 2,
        title: 'AI Bot Challenge',
        date: '2025-04-10',
        description: 'Compete in designing autonomous robots to complete tasks in a timed challenge!'
      },
      {
        id: 3,
        title: 'Robotics Fair',
        date: '2025-04-20',
        description: 'Showcase your robot creations and witness cutting-edge automation technology.'
      }
    ]
  },
  {
    clubName: 'Coding Club',
    events: [
      {
        id: 4,
        title: 'Hackathon',
        date: '2025-04-05',
        description: 'Join us for a 24-hour coding marathon where you can build projects, solve problems, and win prizes!'
      },
      {
        id: 5,
        title: 'Competitive Programming',
        date: '2025-04-12',
        description: 'Test your problem-solving skills against coders from around the globe.'
      },
      {
        id: 6,
        title: 'Code Review Session',
        date: '2025-04-18',
        description: 'Learn best practices for writing clean and efficient code with expert reviews.'
      }
    ]
  },
  {
    clubName: 'Art Club',
    events: [
      {
        id: 7,
        title: 'Art Expo',
        date: '2025-04-15',
        description: 'Showcase your artistic talent, explore beautiful artworks, and participate in creative workshops.'
      },
      {
        id: 8,
        title: 'Portrait Painting Workshop',
        date: '2025-04-22',
        description: 'Learn the art of portrait painting from experienced artists.'
      },
      {
        id: 9,
        title: 'Sketching Contest',
        date: '2025-04-28',
        description: 'Compete in a live sketching contest and win exciting prizes!'
      }
    ]
  }
];

const ClubEvents = () => (
  <div className="container">
    {/* Page Title */}
    <div className="page-title mb-4">
      <h2 className="text-black mt-5 pt-5">Clubs' Events</h2>
    </div>

    {/* Clubs with Events */}
    {clubsWithEvents.map((club) => (
      <div key={club.clubName} className="club-section mb-5">
        {/* Club Name */}
        <h4 className="club-name text-center">{club.clubName}</h4>

        {/* Club Events */}
        <div className="d-flex flex-wrap justify-content-center">
          {club.events.map((event) => (
            <div key={event.id} className="club-card border border-dark m-2 p-3 rounded">
              <h5 className="event-title text-center mb-3">{event.title}</h5>
              <p className="club-description"><strong>Date:</strong> {event.date}</p>
              <p className="club-description">{event.description}</p>
              <button className="btn btn-success join-btn">Register</button>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ClubEvents;
