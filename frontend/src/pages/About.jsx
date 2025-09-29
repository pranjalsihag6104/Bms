import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import aboutImg from "../assets/About-blog.avif";
import ScrollToTopButton from "../components/ScrollToTopButton";
import userLogo from "../assets/user.jpg";

const About = () => {
  const location = useLocation();
  const [authors, setAuthors] = useState([]);

  // ✅ Fetch authors dynamically from backend
  const fetchAuthors = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/all-users");
      if (res.data.success) {
        const filteredAuthors = res.data.users.filter((u) => u.role === "author");
        setAuthors(filteredAuthors);
      }
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // ✅ Scroll to section if hash is present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location, authors]);

  return (
    <div className="min-h-screen pt-28 px-4 md:px-0 mb-7">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="md:text-5xl text-4xl font-extrabold mb-4">
            About Niramaya Care:
          </h1>
          <p className="text-lg">
            A place to share thoughts, inspire others, and grow together.
          </p>
        </div>

        {/* Image + Text Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          <img
            src={aboutImg}
            alt="Blog Illustration"
            className="w-full h-72 object-cover rounded-2xl shadow-md"
          />
          <div>
            <p className="text-lg mb-4">
              Niramaya Care is a trusted public-health library that empowers
              communities with clear, evidence-based guidance and practical ways
              to build healthy habits.
            </p>
            <p className="text-lg mb-4">
              We publish accessible articles on prevention and everyday
              wellness, not to alarm, but to help readers make informed
              decisions and strengthen India’s health.
            </p>
            <p className="text-lg">
              Our insights draw primarily on Indian biostatistics and national
              datasets, representing about one-sixth of the world’s population.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-2xl italic text-gray-500">
            "Words are powerful. Use them to inspire."
          </blockquote>
        </div>
      </div>

      <hr className="border-t-2 border-black my-6" />

      {/* Dynamic Collaborators Section */}
      <div className="mt-20 max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="md:text-5xl text-4xl font-extrabold mb-4">
            Meet Our Team:
          </h2>
        </div>

        {authors.length > 0 ? (
          authors.map((person, index) => {
            const personId = `${person.firstName}-${person.lastName}`
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (
              <div key={index} id={personId} className="mt-20">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <img
                    src={person.photoUrl || userLogo}
                    alt={person.firstName}
                    className="w-64 h-64 object-cover rounded-full shadow-md mx-auto"
                  />
                  <div>
                    <h1 className="text-lg font-bold">
                      {person.firstName} {person.lastName}
                    </h1>
                    {person.occupation && (
                      <h2 className="mb-2 font-semibold">{person.occupation}</h2>
                    )}
                    <p className="text-lg mb-4">
                      {person.bio ||
                        "This author hasn’t written a bio yet. Stay tuned!"}
                    </p>
                    {person.quote && (
                      <blockquote className="text-2xl italic text-gray-500">
                        {person.quote}
                      </blockquote>
                    )}
                  </div>
                </div>

                {index !== authors.length - 1 && (
                  <hr className="w-9/10 ml-30 mt-16 border-t-2 border-black" />
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No collaborators found.
          </p>
        )}
      </div>

      <div className="flex justify-center my-8">
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default About;
