// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/college-hero.jpg'; // ✅ Only one import

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* 🖼️ Hero Image */}
        <div>
          <img
            src={heroImage}
            alt="College Hero"
            className="rounded-xl shadow-xl w-full max-h-[400px] object-cover"
          />
        </div>

        {/* ✨ Text Section */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            One Portal, Every Campus 🎓
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Discover inter-college hackathons, workshops, and events all in one place.
            Connect, participate, and grow with students across campuses.
          </p>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow transition duration-200"
            >
              🚀 Get Started
            </Link>
            <Link
              to="/events"
              className="border border-indigo-600 text-indigo-700 hover:bg-indigo-100 px-6 py-3 rounded-md transition duration-200"
            >
              🎉 Explore Events
            </Link>
          </div>
        </div>
      </div>

      {/* 💡 Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-10">Why One Portal?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">🎯 Verified Events</h3>
            <p className="text-gray-600">All events are cross-checked and verified before being listed.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">👥 Student Network</h3>
            <p className="text-gray-600">Build your profile, join teams, and collaborate on real projects.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">📚 Learn & Grow</h3>
            <p className="text-gray-600">Participate in workshops and grow your technical & soft skills.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
