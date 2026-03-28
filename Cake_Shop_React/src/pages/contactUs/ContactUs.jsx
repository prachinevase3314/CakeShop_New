import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./ContactUs.scss";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          We'd love to hear from you. Get in touch with us today!
        </p>

        {submitted && (
          <div className="success-message">
            <p>Thank you for your message! We'll get back to you soon.</p>
          </div>
        )}

        <div className="contact-content">
          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send us a Message</h2>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your message..."
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="info-card">
              <h2>Get in Touch</h2>

              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-details">
                  <h3>Address</h3>
                  <p>Naigaon-Jawale Road</p>
                  <p>Shirwal, Satara 412801</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-details">
                  <h3>Phone</h3>
                  <p>+91 9876543210</p>
                  <p>Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-details">
                  <h3>Email</h3>
                  <p>info@maulicakeshop.com</p>
                  <p>support@maulicakeshop.com</p>
                </div>
              </div>

              <div className="business-hours">
                <h3>Business Hours</h3>
                <ul>
                  <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                  <li>Saturday: 10:00 AM - 9:00 PM</li>
                  <li>Sunday: 10:00 AM - 7:00 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
