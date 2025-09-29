import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LikedBlogs = () => {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    async function fetchLiked() {
      try {
        const res = await axios.get("https://bms-nwl5.onrender.com/api/v1/user/liked", { withCredentials: true });
        setLiked(res.data.likedArticles);
      } catch (error) {
        console.error("Error fetching liked blogs:", error);
      }
    }
    fetchLiked();
  }, []);

  return (
    <div className="pt-20 md:ml-[320px] p-6">
      <h1 className="text-3xl font-bold mb-6">Liked Blogs ❤️</h1>
      {liked.length === 0 ? (
        <p>No liked blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liked.map((blog) => (
            <div key={blog._id} className="border rounded-lg p-4 shadow hover:shadow-md">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600">By {blog.author?.firstName} {blog.author?.lastName}</p>
              <Link to={`/blogs/${blog._id}`} className="text-blue-500 mt-2 inline-block">Read more →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedBlogs;
