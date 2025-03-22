import React from 'react';

function Testimonials() {
  return (
    <div className="container mt-5">
      <h2 className="text-center">What Our Members Say</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <p>"This platform has transformed the way we manage our club events!"</p>
            <strong>- John Doe, IEEE Member</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <p>"A seamless experience for students and club admins alike."</p>
            <strong>- Sarah Lee, ACM Coordinator</strong>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <p>"Managing resources and tracking credits has never been easier!"</p>
            <strong>- David Kim, AWS Club</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;  // ✅ Make sure to export it as default
