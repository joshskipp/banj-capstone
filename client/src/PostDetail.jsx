import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // Change from project to post

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error("Error fetching post:", error));
  }, [id]);

  // Handle the delete button click
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      console.log("Post deleted successfully");
      navigate("/"); // Return home page after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  if (!post) return <p>not found...\n <button onClick={() => navigate("/")}>Back to Projects</button></p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.postText}</p>
      <p><strong>Created by:</strong> {post.username}</p>
      <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete Post
      </button>
      <button onClick={() => navigate("/")}>Back to Projects</button>
    </div>
  );
}