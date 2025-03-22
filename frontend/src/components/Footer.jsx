// import React from 'react';
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-8">
//       <div className="max-w-6xl mx-auto px-6 md:px-12">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
//           {/* Fire Department Info */}
//           <div>
//             <h2 className="text-2xl font-bold text-sky-500">Techno</h2>
//             <p className="mt-2 text-gray-400">
//               Ensuring events and membership through Techno Org.
//             </p>
//             <div className="mt-4 flex items-center justify-center md:justify-start space-x-3">
//               <FaMapMarkerAlt className="text-sky-400" />
//               <p className="text-gray-400">123 Emergency Lane, City, Country</p>
//             </div>
//             <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
//               <FaPhoneAlt className="text-sky-400" />
//               <p className="text-gray-400">+1 800 123 4567</p>
//             </div>
//             <div className="flex items-center justify-center md:justify-start space-x-3 mt-2">
//               <FaEnvelope className="text-sky-400" />
//               <p className="text-gray-400">technoclub@medicaps.com</p>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-semibold border-b-2 border-sky-500 inline-block pb-1">Quick Links</h3>
//             <ul className="mt-4 space-y-2">
//               <li><a href="/homeofficer" className="text-gray-400 hover:text-sky-400">Dashboard</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-sky-400">Applications</a></li>
//               <li><a href="# inspection-schedule" className="text-gray-400 hover:text-sky-400">Memberships</a></li>
//               <li><a href="#approved-applications" className="text-gray-400 hover:text-sky-400">AI credit Score</a></li>
//             </ul>
//           </div>

//           {/* Support & Help */}
//           <div>
//             <h3 className="text-xl font-semibold border-b-2 border-sky-500 inline-block pb-1">Support</h3>
//             <ul className="mt-4 space-y-2">
//               <li><a href="#" className="text-gray-400 hover:text-sky-400">FAQs</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-sky-400">Contact Us</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-sky-400">Terms & Policies</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
//           &copy; {new Date().getFullYear()} Techno Club Medicaps . All Rights Reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import { FaFacebookF, FaTwitter, FaSkype, FaLinkedinIn } from "react-icons/fa";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="gy-4">
          {/* Club Info */}
          <Col md={3}>
            <h2 className="text-primary fw-bold">Techno Clubs</h2>
            <p className="text-light">
              We are a community of tech enthusiasts, working to build and share
              innovative tech solutions and projects.
            </p>
            <div className="d-flex gap-3 mt-3">
              <FaFacebookF className="text-light hover-effect" />
              <FaTwitter className="text-light hover-effect" />
              <FaSkype className="text-primary hover-effect" />
              <FaLinkedinIn className="text-light hover-effect" />
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h5 className="fw-semibold">QUICK LINKS</h5>
            <ul className="list-unstyled text-light">
              <li className="hover-effect">About Us</li>
              <li className="hover-effect">Projects</li>
              <li className="hover-effect">Blog</li>
              <li className="hover-effect">Contact</li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <h5 className="fw-semibold">CONTACT INFO</h5>
            <ul className="list-unstyled text-light">
              <li>Techno Clubs, ABC University</li>
              <li>+1 234 567 890</li>
              <li>📧 techxclub@abcuniversity.edu</li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col md={3}>
            <h5 className="fw-semibold">NEWSLETTER</h5>
            <p className="text-light">Stay updated with the latest tech news and events.</p>
            <Form>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                className="mb-2"
              />
              <Button variant="primary" className="w-100">
                SUBSCRIBE NOW
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div className="text-center text-secondary mt-4 pt-3 border-top">
          <p>© 2025 Techno Clubs. All Rights Reserved</p>
          <div className="d-flex justify-content-center gap-3">
            <span className="hover-effect">Privacy Policy</span>
            <span className="hover-effect">Terms of Service</span>
          </div>
        </div>
      </Container>

      {/* Custom Styles */}
      <style>
        {`
          .hover-effect {
            cursor: pointer;
            transition: color 0.3s ease-in-out;
          }
          .hover-effect:hover {
            color: #007bff !important;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
