import React from "react";
import { NavLink } from "react-router-dom";
import { categories, SHOP_NAME } from "../../utils/constants";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <section className="about-header">
        <h1>About us</h1>
      </section>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <NavLink to="/">Home</NavLink>
        <span> &gt; </span>
        <span>About us</span>
      </div>

      {/* About Content Section */}
      <section className="about-content-section">
        <div className="about-content">
          <p>
            The Cake Shop was founded by a Miss. Prachi Nevase and her team.
            They are passionate and dedicated bakers who are committed in baking
            the most delicious cakes and pastries around. Using only the highest
            quality ingredients we can assure that you are served the best
            quality cake you can ever have.
          </p>

          <p>
            We have evolved to become one of a premium distributor and
            wholesaler for cakes and pastries to some well known restaurants,
            cafes, supermart, hotels and bakery.
          </p>

          <p>
            Our online store is a leading online shop in Pune(Bhd) providing
            cakes and gifts deliveries within Pune. We provide competitive
            prices, good after sales services and on-time delivery.
          </p>

          <p>
            The Cake Shop provides same day delivery service seven days a week,
            including Sunday, within Pune to provide a high level of customer
            service.
          </p>

          <p>
            <strong>Bon Appetite!!</strong>
          </p>

          <p>
            <strong>{SHOP_NAME}</strong>
          </p>
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
    </div>
  );
};

export default About;
