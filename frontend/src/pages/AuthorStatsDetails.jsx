
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Eye, MessageSquare, ThumbsUp, ArrowLeft, Search, Trash2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog";

import userLogo from "../assets/user.jpg";

const AuthorStatsDetails = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const navigate = useNavigate();

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/blog/get-own-blogs",
          { withCredentials: true }
        );
        if (res.data.success) {
          setBlogs(res.data.blogs);
          setFilteredBlogs(res.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

    // ✅ Delete Blog Function
  const deleteBlog = async () => {
    if (!deleteTarget) return;

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/${deleteTarget}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Blog deleted successfully!");
        const updatedBlogs = blogs.filter((b) => b._id !== deleteTarget);
        setBlogs(updatedBlogs);
        setFilteredBlogs(updatedBlogs);
        setDeleteTarget(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };


  // Filter + Sort blogs
  useEffect(() => {
    let filtered = blogs.filter((b) => {
  const matchesTitle = b.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
  return matchesTitle && matchesCategory;
});


    switch (sortBy) {
      case "views":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "likes":
        filtered.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        break;
      case "comments":
        filtered.sort(
          (a, b) => (b.commentsCount || 0) - (a.commentsCount || 0)
        );
        break;
      case "date":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, sortBy, blogs,categoryFilter]);

  return (
    <div className="pt-20 md:ml-[320px] min-h-screen px-6">
      {/* Back Button */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Profile</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            📊 Your All Articles with Statistics
          </h1>

          {/* Search + Sort */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select onValueChange={setSortBy} defaultValue="date">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Newest</SelectItem>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="likes">Likes</SelectItem>
                <SelectItem value="comments">Comments</SelectItem>
              </SelectContent>
            </Select>

    <Select
  value={categoryFilter}
  onValueChange={setCategoryFilter}
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="All Categories" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Categories</SelectItem>
    <SelectItem value="Common Conditions">Common Conditions</SelectItem>
    <SelectItem value="Mental Health">Mental Health</SelectItem>
    <SelectItem value="Skin and hair health">Skin and hair health</SelectItem>
    <SelectItem value="Lifestyle and Nutrition">Lifestyle and Nutrition</SelectItem>
    <SelectItem value="Substance use and addictions">Substance use and addictions</SelectItem>
  </SelectContent>
</Select>

    <button
    onClick={() => {
    setSearchTerm("");
    setSortBy("date");
    setCategoryFilter("all"); // ✅ Reset category filter to "all"
    setFilteredBlogs(blogs);   // ✅ reset list
    }}
    className="px-4 py-2 bg-black text-white dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-900 dark:hover:bg-gray-600 transition"
  >
    Reset
  </button>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden flex flex-col md:flex-row gap-6 p-4 border border-gray-200 dark:border-gray-700"
              >
                {/* Thumbnail */}
                <div className="md:w-1/3 w-full">
                  <img
                    src={blog.thumbnail || userLogo}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Blog Content */}
                <div className="md:w-2/3 w-full flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                      {blog.title}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      {blog.subtitle}
                    </p>

                    {blog.category && (
                      <div className="mt-3">
                        <Badge variant="secondary">{blog.category}</Badge>
                      </div>
                    )}
                  </div>

                  {/* Stats Section */}
                  <div className="flex flex-wrap justify-between items-center mt-4 text-sm">
                    <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-blue-500" />{" "}
                        {blog.views || 0} Views
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-pink-500" />{" "}
                        {blog.likes?.length || 0} Likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-green-500" />{" "}
                        {blog.commentsCount || 0} Comments
                      </span>
                    </div>

                    <p className="text-xs italic text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-4">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/dashboard/write-blog/${blog._id}`}
                      className="inline-block px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-blue-700 transition ml-5 mr-5"
                    >
                      Edit
                    </Link>

                       {/* 🆕 Delete Confirmation Popup */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={() => setDeleteTarget(blog._id)}
                          className="inline-flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this blog? This
                            action <span className="text-red-500">cannot</span>{" "}
                            be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={()=>deleteBlog()}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Yes, Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>



                    {/* <Link
                      onClick={() => deleteBlog(blog._id)}
                      className="inline-block px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </Link> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No blogs found. Try adjusting filters or search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorStatsDetails;
