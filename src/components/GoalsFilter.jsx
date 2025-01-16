import React from 'react';

const GoalFilters = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="goal-filters">
      <h3>Filter Goals</h3>
      <label htmlFor="priority">Priority:</label>
      <select value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="high">🔥 High Priority</option>
        <option value="medium">⚖️ Medium Priority</option>
        <option value="low">🌱 Low Priority</option>
      </select>
      {" "}
      <label htmlFor="status">Status:</label>
        <select value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="completed">✅ Completed</option>
        <option value="incomplete">⏳ Incomplete</option>
      </select>
    </div>
  );
};

export default GoalFilters;
