import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header>
        <h1>BorderBuddy</h1>
        <nav>
          <Link to="/signup" className="cta-button">
            Sign Up
          </Link>
          <Link to="/login" className="cta-button">
            Login
          </Link>
        </nav>
      </header>

      <section className="hero">
        <h2>Welcome to BorderBuddy</h2>
        <p>Your go-to solution for international travel.</p>
        <Link to="/signup" className="cta-button">
          Join Now
        </Link>
      </section>

      <section className="features">
        <h3>Features</h3>
        <div className="feature">
          <h4>Feature One</h4>
          <p>Manage your travel documents easily.</p>
        </div>
        <div className="feature">
          <h4>Feature Two</h4>
          <p>Track your trips and visas.</p>
        </div>
        <div className="feature">
          <h4>Feature Three</h4>
          <p>Get travel recommendations based on your passport.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
