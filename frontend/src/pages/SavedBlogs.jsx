import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SavedBlogs = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    async function fetchSaved() {
      try {
        const res = await axios.get("https://bms-nwl5.onrender.com/user/saved", { withCredentials: true });
        setSaved(res.data.savedArticles);
      } catch (error) {
        console.error("Error fetching saved blogs:", error);
      }
    }
    fetchSaved();
  }, []);

  return (
    <div className="pt-20 md:ml-[320px] p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Blogs 📚</h1>
      {saved.length === 0 ? (
        <p>No saved blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {saved.map((blog) => (
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

export default SavedBlogs;
