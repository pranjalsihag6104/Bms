import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Loader2 } from "lucide-react";

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("https://bms-nwl5.onrender.com/user/my-comments", {
          withCredentials: true,
        });
        if (res.data.success) {
          setComments(res.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="pt-20 md:ml-[320px]">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">💬 My Comments</h1>

        {comments.length === 0 ? (
          <p className="text-gray-500">You haven’t commented on any blogs yet.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card
                key={comment._id}
                className="p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                {comment.postId?.thumbnail && (
                  <img
                    src={comment.postId.thumbnail}
                    alt={comment.postId.title}
                    className="w-24 h-16 rounded-md object-cover"
                  />
                )}

                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                  <div className="text-sm text-gray-500 flex justify-between mt-2">
                    <span>📝 {comment.postId?.title || "Deleted Blog"}</span>
                    <Link
                      to={`/blogs/${comment.postId?._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Blog →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComments;
