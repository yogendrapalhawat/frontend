import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Users, Calendar, Trophy, BookOpen, Star,
  Zap, Globe, Heart, ChevronDown, Play, Sparkles
} from 'lucide-react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: Calendar, title: "Campus Events", description: "Never miss another event, workshop, or hackathon" },
    { icon: Users, title: "Student Clubs", description: "Connect with like-minded peers and communities" },
    { icon: Trophy, title: "Competitions", description: "Showcase your skills in inter-college competitions" },
    { icon: BookOpen, title: "Projects", description: "Collaborate on exciting projects with peers" },
  ];

  const stats = [
    { number: "50K+", label: "Active Students", icon: Users },
    { number: "1000+", label: "Events Hosted", icon: Calendar },
    { number: "500+", label: "Clubs & Communities", icon: Heart },
    { number: "100+", label: "Partner Colleges", icon: Globe },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "This platform transformed my college experience! Found my passion for hackathons.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Engineering Student",
      content: "Connected with amazing project partners and built industry-ready applications.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Design Student",
      content: "The user interface is intuitive and the community is incredibly supportive!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <div className="home-container">
      <div className="mouse-follower" style={{ left: mousePosition.x, top: mousePosition.y }}></div>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-tagline">
              <Sparkles size={16} /> Trusted by 50,000+ students
            </div>
            <h1>One Portal,<br />Every Campus</h1>
            <p>Your central hub for everything campus related. Explore events, clubs, match requests, and project opportunities in one beautiful, intuitive platform.</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/login')}>
                Get Started <ArrowRight size={16} />
              </button>
              <button className="btn-secondary">
                <Play size={16} /> Watch Demo
              </button>
            </div>
            <div className="stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-icon"><stat.icon size={20} /></div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image-container">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/college-campus-3732936-3121832.png"
                alt="Campus"
                className="hero-image"
              />
              <div className="floating-icon top-left"><Trophy size={24} /></div>
              <div className="floating-icon bottom-right"><BookOpen size={24} /></div>
              <div className="floating-icon mid-left"><Calendar size={24} /></div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <ChevronDown size={28} />
        </div>
      </section>

      <section className="features">
        <h2>Everything You Need in <span>One Place</span></h2>
        <p>Streamline your campus experience with our comprehensive platform designed for modern students</p>
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon"><feature.icon size={24} /></div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Students Say</h2>
        <p>Join thousands of students who transformed their campus experience</p>
        <div className="testimonial-cards">
          {testimonials.map((t, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-header">
                <img src={t.avatar} alt={t.name} />
                <div>
                  <h4>{t.name}</h4>
                  <small>{t.role}</small>
                </div>
              </div>
              <p>"{t.content}"</p>
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} color="#facc15" fill="#facc15" />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Transform Your <span>Campus Life?</span></h2>
        <p>Join thousands of students already making the most of their college experience</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate('/login')}>
            <Zap size={16} /> Get Started Now <ArrowRight size={16} />
          </button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
