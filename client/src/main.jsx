import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import PostDetail from "./PostDetail.jsx"; // Import the post details page
// import ProjectPage from './pages/ProjectPage'; // New detailed project page

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        {/* <Route path="/project/:id" element={<ProjectPage />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
