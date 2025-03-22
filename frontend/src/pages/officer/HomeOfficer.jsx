import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

function HomeOfficer() {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="display-4 text-primary fw-bold">Welcome</h1>
        <p className="lead text-secondary">
          Manage club activities, oversee events, and ensure smooth operations.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-primary btn-lg">View Clubs</button>
        <button className="btn btn-success btn-lg">Manage Events</button>
      </div>

      {/* Information Cards */}
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">📌 Club Management</h5>
              <p className="card-text">
                Oversee club activities and ensure smooth functioning.
              </p>
              <button className="btn btn-outline-primary">Manage Clubs</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-success">🎟 Event Oversight</h5>
              <p className="card-text">
                Approve and monitor upcoming club events seamlessly.
              </p>
              <button className="btn btn-outline-success">Review Events</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">📢 Announcements</h5>
              <p className="card-text">
                Share important updates with students and club members.
              </p>
              <button className="btn btn-outline-warning">Post Announcements</button>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default HomeOfficer;
