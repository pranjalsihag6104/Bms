import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import heroNirmaya2 from "../assets/homepage.jpg";

const Hero = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);

    // Add a small delay for loading effect
    setTimeout(() => {
      if (!user) {
        navigate('/blogs');
      } else if (user.role === 'author') {
        navigate('/dashboard/write-blog');
      } else {
        navigate('/blogs');
      }

      // Scroll to top smoothly after navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Stop loading after redirect
      setLoading(false);
    }, 700);
  };

  return (
    <div className="px-4 md:px-0 mt-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-[600px] my-10 md:my-0">
        {/* text section */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Evidence-based articles for everyday health.
          </h1>

          <p className="text-lg md:text-xl opacity-80 mb-6">
            Readable, reliable health education for everyone—with clear guidance on what to watch for, when to act, and how to prevent problems.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={handleGetStarted}
              disabled={loading}
              className={`bg-blue-600 text-white text-lg px-6 py-3 transition-all ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Loading...</span>
                </div>
              ) : (
                'Get Started'
              )}
            </Button>

            <Link to="/about">
              <Button
                variant="outline"
                className="border-white px-6 py-3 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* image section */}
        <div className="flex items-center justify-center mt-10 md:mt-0">
          <img
            src={heroNirmaya2}
            alt="Hero section"
            className="md:h-[350px] md:w-[700px] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
