import React, { useState, useEffect } from 'react';

const GoalForm = ({ onSubmit}) => {
  const [editGoal, setEditGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium',
  });

  // Populate form if editing an existing goal
  useEffect(() => {
    if (editGoal) {
      setFormData({
        title: editGoal.title,
        description: editGoal.description,
        deadline: editGoal.deadline,
        priority: editGoal.priority,
      });
    }
  }, [editGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the data to parent for submission
    setFormData({
      title: '',
      description: '',
      deadline: '',
      priority: 'Medium',
    });
    setEditGoal(null); // Clear edit state
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>{editGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
      <label className="">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label>Description:</label>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>Deadline:</label>
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        required
      />
      <label>Priority:</label>
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="High">🔥 High</option>
        <option value="Medium">⚖️ Medium</option>
        <option value="Low">🌱 Low</option>
      </select>
      <br />
      <label>Status:</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="completed">✅ Completed</option>
        <option value="incomplete">⏳ In Progress</option>
      </select>
      <br />
      <button type="submit">{editGoal ? 'Update Goal' : 'Add Goal'}</button>
    </form>
  );
};

export default GoalForm;
