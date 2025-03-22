import React from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="home-container">

      <ParticleBackground />
      
<Navbar />
      {/* Content Section */}
      <div className="content">
        {/* Hero Section */}
        <section className="hero">
          <h1>Join the Future of Tech Clubs</h1>
          <p>Revolutionizing student organizations with automation & collaboration.</p>
          <Link to="/events">
            <button className="cta-button me-3">Explore Events</button>
          </Link>
          <Link to="/clubs">
            <button className="cta-button">Explore Clubs</button>
          </Link>
        </section>

        {/* Featured Clubs */}
        {/* <section className="featured-clubs">
          <h2>Popular Clubs</h2>
          <div className="club-list">
            <div className="club-card">
              <h3>🚀 AI & Machine Learning Club</h3>
              <p>Explore AI projects, research, and hackathons.</p>
            </div>
            <div className="club-card">
              <h3>💻 Web Development Club</h3>
              <p>Build amazing websites and learn new technologies.</p>
            </div>
            <div className="club-card">
              <h3>🎮 Game Development Club</h3>
              <p>Create your own games and animations.</p>
            </div>
          </div>
        </section> */}
        {/* Featured Clubs */}
<section className="featured-clubs container mt-5">
  <h2 className="text-primary text-center mb-4">Popular Clubs</h2>
  <div className="row">
    <div className="col-md-4">
      <div className="card bg-light shadow-sm p-3">
        <h3 className="text-info">🚀 AI & Machine Learning Club</h3>
        <p>Explore AI projects, research, and hackathons.</p>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card bg-light shadow-sm p-3">
        <h3 className="text-success">💻 Web Development Club</h3>
        <p>Build amazing websites and learn new technologies.</p>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card bg-light shadow-sm p-3">
        <h3 className="text-danger">🎮 Game Development Club</h3>
        <p>Create your own games and animations.</p>
      </div>
    </div>
  </div>
</section>


        {/* Upcoming Events */}
        <section className="events">
          <div className="events-header">
            <h2>Upcoming Events</h2>
            <Link to="/my-events" className="explore-more-link">
              <button className="explore-more-button">Explore More →</button>
            </Link>
          </div>
          <ul>
            <li className="h-28 flex justify-center items-center">🎤 TechTalk 2024 - AI in Industry (April 10, 2024)</li>
            <li className="h-28 flex justify-center items-center">💡 Hackathon - Build for Good (May 15, 2024)</li>
            <li className="h-28 flex justify-center items-center">📚 Workshop - Web Dev Basics (June 5, 2024)</li>
          </ul>
        </section>

        {/* Latest Tech Articles */}
        <section className="tech-news">
          <h2>Latest in Tech</h2>
          <div className="news-grid">
            <article className="h-48 flex flex-col justify-center items-center">
              <h3>🤖 AI is Changing the World</h3>
              <p>AI is transforming industries faster than ever. Learn more.</p>
            </article>
            <article className="h-48 flex flex-col justify-center items-center">
              <h3>🚀 Web 3.0 & the Future</h3>
              <p>Discover how decentralized tech is shaping the internet.</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );

};

export default Home;
