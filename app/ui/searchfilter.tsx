import React from 'react';

const SearchFilterButton: React.FC = () => {
  return (
    <div className="search-filter-widget">
      <div className="search-container">
        <label htmlFor="search" className="search-label">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Enter your search"
          className="search-input"
        />
      </div>

      <div className="filter-container">
        <label htmlFor="filter" className="filter-label">Filter:</label>
        <select id="filter" className="filter-select">
          <option value="">Select filter</option>
          <option value="status">Status</option>
          <option value="category">Category</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="button-container">
        <button className="filter-button" type="button">
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default SearchFilterButton;
