import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom';

// Register the module explicitly
ModuleRegistry.registerModules([ClientSideRowModelModule]);

export default function App() {
  const [projects, setProjects] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [newPost, setNewPost] = useState({
    title: '',
    postText: '',
    username: '',
  });
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    axios.get("http://localhost:3001/posts")
      .then((response) => {
        console.log("Fetched projects:", response.data);
        setProjects(response.data);
        setListOfPosts(response.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // Handle input changes for the new post form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  // Handle form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/posts", newPost);
      console.log("New post created:", response.data);

      // Update the list of posts
      setListOfPosts([...listOfPosts, response.data]);
      setProjects([...projects, response.data]);

      // Reset the form and hide it
      setNewPost({ title: '', postText: '', username: '' });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const columnDefs = [
    { headerName: "Project", field: "title" },
    { headerName: "Description", field: "postText" },
    { headerName: "User", field: "username" },
  ];

  return (
    <>
      <h1>Projects</h1>

      {/* Button to show the new post form */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Post'}
      </button>

      {/* New post form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Post Text:</label>
            <input
              type="text"
              name="postText"
              value={newPost.postText}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={newPost.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Create Post</button>
        </form>
      )}


      {/* AG Grid */}
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={projects}
          onRowClicked={(row) => navigate(`/posts/${row.data.id}`)}
          />
      </div>
          {/* Display posts */}
          <h2>Debugging Raw Data</h2>
          <pre>{JSON.stringify(listOfPosts, null, 2)}</pre>
    
          {listOfPosts.length > 0 ? (
            listOfPosts.map((value) => (
              <div key={value.id} className="post">
                <div className="title">{value.title}</div>
                <div className="body">{value.postText}</div>
                <div className="footer">{value.username}</div>
              </div>
            ))
          ) : (
            <p>Loading posts...</p>
          )}
    </>
  );
}