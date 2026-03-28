import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaThumbsUp,
  FaLeaf,
  FaTruck,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { categories } from "../../utils/constants";
import "./Home.scss";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Hero slides data
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=400&fit=crop",
      title: "The cake we bake with love",
      description:
        "Our homemade special cakes are crafted with passion, love, and the finest quality ingredients.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=400&fit=crop",
      title: "Freshly Baked Every Day",
      description:
        "We bake fresh cakes every morning using premium natural ingredients.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  // Features data
  const features = [
    {
      icon: <FaThumbsUp />,
      title: "Quality",
      description:
        "Our very first priority is the quality we never compromise in the quality of our bakery products.",
    },
    {
      icon: <FaLeaf />,
      title: "Fresh & natural",
      description:
        "Our every product is fresh and made with natural ingredients we do not use the artificial food ingredients.",
    },
    {
      icon: <FaTruck />,
      title: "Free delivery",
      description:
        "We provide free delivery to our customers. We deliver in 1 hr from the time customer order the product.",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          <div className="slides-container">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-content">
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-description">{slide.description}</p>
                  <button
                    className="slide-btn"
                    onClick={() => navigate("/shop")}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            <FaArrowRight />
          </button>

          {/* Dots */}
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Our Features</h2>
        <div className="features-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Our Categories</h2>
        <div className="categories-container">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div
                className="category-image"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <h3 className="category-name">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="who-we-are-section">
        <div className="who-we-are-container">
          <div className="who-we-are-content">
            <h2>Who We Are</h2>
            <p>
              We are bakers, we bake the piece of joy. We believe cake and baked
              goods are an expression of love.
            </p>
            <p>
              Who believes? Everyone loves traditional homemade cakes and baked
              goods in a way can't bake, and doing great cakes? They never
              organized website mills, sugar-flour eggs, brands of real nuts,
              great crackers, amazingly delicious chocolates, and lots and lots
              of real butter so screum simply delicious insiders the old
              fashioned way.
            </p>
            <button className="read-more-btn">Read More</button>
          </div>
          <div className="who-we-are-image">
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=400&fit=crop"
              alt="Who We Are"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2>Always happy to hear from you.</h2>
          <button className="contact-btn">Contact Us</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
