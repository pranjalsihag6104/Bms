import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userLogo from "../assets/user.jpg";

const PopularAuthors = () => {
  const [allAuthors, setAllAuthors] = useState([]);
  const [index, setIndex] = useState(0);
  const visibleCount = 3; // 👈 number of authors visible at once

  const navigate = useNavigate();

  // ✅ Fetch all authors from DB
  const getAllUsers = async () => {
    try {
      const res = await axios.get("https://bms-nwl5.onrender.com/api/v1/user/all-users");
      if (res.data.success) {
        const authors = res.data.users.filter((u) => u.role === "author");
        setAllAuthors(authors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // ✅ Slider controls
  const next = () => {
    if (index + visibleCount < allAuthors.length) {
      setIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  // ✅ Navigate to author section on About page
  const goToAuthor = (user) => {
    const id = `${user.firstName}-${user.lastName}`
      .toLowerCase()
      .replace(/\s+/g, "-");
    navigate(`/about#${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto my-16 px-4">
      {/* Title */}
      <div className="flex flex-col space-y-4 items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Meet Our Collaborators
        </h1>
        <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
          Our team of passionate medical professionals sharing knowledge to build a healthier community.
        </p>
      </div>

      {/* Slider Section */}
      <div className="flex items-center justify-center gap-4 my-10">
        {/* Left Arrow */}
        {index > 0 && (
          <button
            onClick={prev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Authors Container */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / visibleCount)}%)`,
            }}
          >
            {allAuthors.map((user, idx) => (
              <div
                key={idx}
                onClick={() => goToAuthor(user)}
                className="flex flex-col items-center flex-shrink-0 w-1/3 px-4 cursor-pointer group"
              >
                {/* Profile Photo */}
                <img
                  src={user?.photoUrl || userLogo}
                  alt={user?.firstName}
                  className="rounded-full w-36 h-36 md:w-40 md:h-40 object-cover shadow-lg transition-transform duration-500 group-hover:scale-110"
                />

                {/* Author Info */}
                <div className="mt-4 text-center">
                  <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    {user?.occupation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {index + visibleCount < allAuthors.length && (
          <button
            onClick={next}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PopularAuthors;
