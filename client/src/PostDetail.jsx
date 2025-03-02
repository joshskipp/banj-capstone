import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // Change from project to post
  // Updatepost
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  // set edited post state to update the post with new data 
  const [editedPost, setEditedPost] = useState({
    title: '',
    postText: '',
    username: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error("Error fetching post:", error));
  }, [id]);

  // Handle the delete button click
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:3001/posts/${id}`);
        console.log("Post deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  // Handle the edit button click
  // NOTE: Editing proved difficult and was supplemented by use of DeepSeek
  const handleEdit = () => {
    setIsEditing(true); // Enter edit mode
  };
  // Handle input changes for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({
      ...editedPost,
      [name]: value,
    });
  };

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit behavior to avoid a page refresh since we're using React Router
    try {
      const response = await axios.put(`http://localhost:3001/posts/${id}`, editedPost);
      console.log("Post updated successfully:", response.data);
      setPost(response.data); // Update the post state with the new data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  // error for no matching post
  if (!post) return <p>not found...\n <button onClick={() => navigate("/")}>Back to Projects</button></p>;

  return (
    <div>
      {isEditing ? (
        // Edit form
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Post Text:</label>
            <input
              type="text"
              name="postText"
              value={editedPost.postText}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={editedPost.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        // Post details
        <>
          <h1>{post.title}</h1>
          <p>{post.postText}</p>
          <p><strong>Created by:</strong> {post.username}</p>

          {/* Edit button */}
          <button onClick={handleEdit} style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }}>
            Edit Post
          </button>

          {/* Delete button */}
          <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
            Delete Post
          </button>
        </>
      )}

      {/* Back button */}
      <button onClick={() => navigate("/")} style={{ marginTop: '10px' }}>Back to Projects</button>
    </div>
  );
}