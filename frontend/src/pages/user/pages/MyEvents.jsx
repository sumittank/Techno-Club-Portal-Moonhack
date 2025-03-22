import React, { useState } from "react";
import { Button, Nav, Tab, Modal } from "react-bootstrap";
import "../styles/event.css";

const MyEvents = () => {
  const [events] = useState([
    {
      id: 1,
      name: "Tech Summit",
      date: "2025-04-15",
      club: "Tech Club",
      status: "Upcoming",
      certificate: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYiYcJPpIZVwcKO6FTidU5a5f-wLBNxMJAg&s",
      description: "Join the biggest tech summit with industry leaders discussing the future of technology.",
    },
    {
      id: 2,
      name: "AI Workshop",
      date: "2025-03-10",
      club: "AI Society",
      status: "Completed",
      certificate: true,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYiYcJPpIZVwcKO6FTidU5a5f-wLBNxMJAg&s",
      description: "Hands-on workshop exploring AI and Machine Learning techniques with real-world applications.",
    },
    {
      id: 3,
      name: "Design Conference",
      date: "2025-05-20",
      club: "Design Club",
      status: "Upcoming",
      certificate: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjm1-MKGyVxNV6VOI6vD8GdKbF62R5B9BJkQ&s",
      description: "Explore the latest trends in design and learn from top creative professionals.",
    },
    {
      id: 4,
      name: "Business Expo",
      date: "2025-06-12",
      club: "Business Club",
      status: "Upcoming",
      certificate: false,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJw7bfJG7OEaUr1-egd94w7CTe7gAdlvu6Ag&s",
      description: "Showcase your startup ideas and connect with investors and business leaders.",
    },
    {
      id: 5,
      name: "Machine Learning Bootcamp",
      date: "2025-02-25",
      club: "AI Society",
      status: "Completed",
      certificate: true,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpk8La3Kx5z1AqnrivRuFGT6-xJiuuCYTUSQ&s",
      description: "An immersive bootcamp diving deep into Machine Learning algorithms and projects.",
    },
    {
      id: 6,
      name: "Startup Pitch Fest",
      date: "2025-03-05",
      club: "Entrepreneurs Hub",
      status: "Completed",
      certificate: true,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5rnL3KQBhsbyymJtJQsg-lsRyNgLY54l-6Q&s",
      description: "Pitch your startup ideas to top VCs and get instant feedback and funding opportunities.",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const downloadCertificate = (event) => {
    const element = document.createElement("a");
    const file = new Blob([`Certificate for ${event.name}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${event.name}_Certificate.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="page-container shifted-down">
      <div className="content-wrap">
        <div className="container mt-4">
          <h2 className="section-title" style={{ color: "black" }}>📌 My Events</h2>

          <Tab.Container defaultActiveKey="upcoming">
            {/* Navigation Tabs */}
            <Nav variant="tabs" className="custom-tabs">
              <Nav.Item>
                <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed">Completed</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            <Tab.Content className="mt-3">
              {/* Upcoming Events */}
              <Tab.Pane eventKey="upcoming">
                <div className="event-grid">
                  {events
                    .filter((e) => e.status === "Upcoming")
                    .map((event) => (
                      <div key={event.id} className="event-card">
                        <img src={event.image} alt={event.name} className="event-image" />
                        <h3 className="event-title">{event.name}</h3>
                        <p className="event-info">
                          {event.club} | {event.date}
                        </p>
                        <Button variant="primary" className="view-details-btn" onClick={() => setSelectedEvent(event)}>
                          View Details
                        </Button>
                      </div>
                    ))}
                </div>
              </Tab.Pane>

              {/* Completed Events */}
              <Tab.Pane eventKey="completed">
                <div className="event-grid">
                  {events
                    .filter((e) => e.status === "Completed")
                    .map((event) => (
                      <div key={event.id} className="event-card">
                        <img src={event.image} alt={event.name} className="event-image" />
                        <h3 className="event-title">{event.name}</h3>
                        <p className="event-info">
                          {event.club} | {event.date}
                        </p>
                        <div className="button-group">
                          <Button variant="primary" className="view-details-btn" onClick={() => setSelectedEvent(event)}>
                            View Details
                          </Button>
                          {event.certificate && (
                            <Button
                              variant="warning"
                              className="download-certificate-btn"
                              onClick={() => downloadCertificate(event)}
                            >
                              Download Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          {/* Event Details Modal */}
          {selectedEvent && (
            <Modal show onHide={() => setSelectedEvent(null)} centered>
              <Modal.Header closeButton>
                <Modal.Title>{selectedEvent.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img src={selectedEvent.image} alt={selectedEvent.name} className="modal-event-image" />
                <p>
                  <strong>Club:</strong> {selectedEvent.club}
                </p>
                <p>
                  <strong>Date:</strong> {selectedEvent.date}
                </p>
                <p>
                  <strong>Status:</strong> {selectedEvent.status}
                </p>
                <p>{selectedEvent.description}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
