import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto"> {/* Add mt-auto to push footer to bottom */}
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="mb-3" style={{ color: 'yellow' }}>About Us</h5> {/* Change color to yellow */}
            <p className="text-muted">We are committed to providing top-notch services in organizing and cleaning spaces, and solving electrical issues efficiently.</p>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3" style={{ color: 'yellow' }}>Quick Links</h5> {/* Change color to yellow */}
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/services" className="text-light text-decoration-none">Services</Link></li>
              <li><Link to="/learnmore" className="text-light text-decoration-none">Learn More</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3" style={{ color: 'yellow' }}>Contact Us</h5> {/* Change color to yellow */}
            <p className="text-muted">411011 Main Street, Pune, India</p>
            <p className="text-muted">Email: rohansabale125@gmail.com</p>
            <p className="text-muted">Phone: +91 7722097528</p>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center text-muted">
          <p className="mb-0" style={{ color: 'white' }}>© 2024 WORKWAVE, Inc. All rights reserved.</p> {/* Change color to white */}
          <p className="mb-0" style={{ color: 'lightblue' }}>Made by Rohan, Harsh, Tanvi, Vaishnavi, and Rohit</p> {/* Change color to lightblue */}
        </div>
      </div>
    </footer>
  );
}
