import React, { useState, useEffect } from "react";
import { Modal, Card, Button, Form, Row, Col } from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/event.css";

const ExploreEvents = () => {
  // Event Data
  const [events] = useState([
    {
      id: 1,
      name: "AI & Machine Learning Workshop",
      date: "2025-05-10",
      club: "AI Club",
      category: "Workshops",
      description: "Dive into the world of AI and Machine Learning with hands-on sessions and expert talks.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShC0lQ5C8kj8IEiSeNWvh0O2f2sqvUpFxZ2w&s",
    },
    {
      id: 2,
      name: "Cybersecurity Bootcamp",
      date: "2025-04-22",
      club: "Cybersecurity Club",
      category: "Tech",
      description: "Learn about ethical hacking, penetration testing, and safeguarding digital assets.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8BQ5kNLOqGDm84SXLc_kzFBXBD0XqAztiw&s",
    },
    {
      id: 3,
      name: "Blockchain and Web3 Summit",
      date: "2025-06-15",
      club: "Blockchain Club",
      category: "Tech",
      description: "Explore the future of decentralized technology, smart contracts, and digital assets.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_xg24v7Kxj5Gwe7WTkIJTOqHGyShjbnkww&s",
    },
  ]);

  // State for Filters, Search, Modal, and Favorites
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteEvents");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favoriteEvents", JSON.stringify(favorites));
  }, [favorites]);

  // Handle favorite toggle
  const toggleFavorite = (eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Filtered Events
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.club.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="explore-container">
      <div className="container-fluid mt-4">
        <h2 className="mb-4 text-center text-primary">🌐 Explore Events</h2>

        {/* Filters */}
        <Form className="mb-4">
          <Row className="g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search Events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>

            <Col md={4}>
              <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Tech">Tech</option>
                <option value="Workshops">Workshops</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {/* Event Cards */}
        <div className="row g-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event.id} className="col-md-6 col-lg-4">
                <Card className="event-card h-100">
                  <Card.Img
                    variant="top"
                    src={event.imageUrl}
                    alt={event.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-primary">{event.name}</Card.Title>
                    <Card.Text>
                      <strong>Club:</strong> {event.club} <br />
                      <strong>Date:</strong> {event.date} <br />
                      <strong>Category:</strong> {event.category}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                      className="me-2 glow-button"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="link"
                      className="heart-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(event.id);
                      }}
                    >
                      {favorites.includes(event.id) ? (
                        <BsHeartFill color="red" size={24} />
                      ) : (
                        <BsHeart size={24} />
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No events found.</p>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal show onHide={() => setSelectedEvent(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.name}
              className="img-fluid mb-3"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <p><strong>Club:</strong> {selectedEvent.club}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Category:</strong> {selectedEvent.category}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ExploreEvents;
