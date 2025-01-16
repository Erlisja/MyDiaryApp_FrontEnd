import React, { useState, useEffect } from 'react';
import goalsEntryService from '../utilities/goalsEntryService'; // Ensure this import is used if needed
import GoalForm from '../components/GoalForm';
import GoalFilters from '../components/GoalsFilter';
import GoalList from '../components/GoalList';
import GoalEditModal from '../components/GoalEditModal';
import { addNewGoal, getAllGoals, deleteGoalEntry, updateGoalEntry} from '../utilities/goalsEntryService'; // Ensure the edit function is imported
import NavBar from '../components/NavBar';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);

  // Fetch goals when the component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  // Function to fetch all goals
  const fetchGoals = async () => {
    try {
      const response = await getAllGoals(); // Assuming it fetches data from an API
      setGoals(response);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Add a new goal
  const handleAddGoal = async (goal) => {
    try {
      await addNewGoal(goal);
      fetchGoals();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoalEntry(id);
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // Open modal for editing a goal
  const handleEditClick = (goal) => {
    setCurrentGoal(goal); // Set the selected goal
    setIsModalOpen(true); // Open the modal
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setCurrentGoal(null); // Clear the selected goal
  };

  // Update the goal
  const handleGoalUpdate = async (updatedGoal) => {
    try {
      await updateGoalEntry(updatedGoal); // Use the correct function to update the goal
      fetchGoals();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  // Filter goals based on the selected filter
  const filteredGoals = goals.filter((goal) => {
    switch (filter) {
      case 'high':
        return goal.priority === 'High';
      case 'medium':
        return goal.priority === 'Medium';
      case 'low':
        return goal.priority === 'Low';
      case 'completed':
        return goal.status === 'completed';
      case 'incomplete':
        return goal.status !== 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="goals-page-container">
      <NavBar layout="horizontal" />
  
      <header className="goals-page-header">
        <h1 className="page-title">Goals Page</h1>
      </header>
  
      {/* Form for adding new goals */}
      <section className="goal-form-section">
        <GoalForm 
          onSubmit={handleAddGoal}
          editGoal={null}
          onEdit={() => {}}
        />
      </section>
  
      {/* Filter Component */}
      <section className="goal-filters-section">
        <GoalFilters filter={filter} setFilter={setFilter} />
      </section>
  
      {/* List of Goals */}
      <section className="goal-list-section">
        <GoalList 
          goals={filteredGoals}
          onEdit={handleEditClick}
          onDelete={handleDeleteGoal}
        />
      </section>
  
      {/* Edit Modal */}
      {isModalOpen && (
        <GoalEditModal show={isModalOpen} onClose={handleCloseModal}>
          {currentGoal && (
            <form
              className="modal-form"
              onSubmit={(e) => {
                e.preventDefault();
                const updatedGoal = {
                  ...currentGoal,
                  title: e.target.title.value,
                  description: e.target.description.value,
                  priority: e.target.priority.value,
                  deadline: e.target.deadline.value,
                  status: e.target.status.value,
                };
                handleGoalUpdate(updatedGoal);
              }}
            >
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  defaultValue={currentGoal.title}
                  id="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  defaultValue={currentGoal.description}
                  id="description"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                  className="form-control"
                  name="priority"
                  defaultValue={currentGoal.priority}
                  id="priority"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
  
              <div className="form-group">
                <label htmlFor="deadline">Deadline:</label>
                <input
                  className="form-control"
                  type="date"
                  name="deadline"
                  defaultValue={currentGoal.deadline}
                  id="deadline"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  className="form-control"
                  name="status"
                  defaultValue={currentGoal.status}
                  id="status"
                >
                  <option value="completed">Completed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
  
              <div className="modal-actions">
                <button className="btn btn-primary" type="submit">Update Goal</button>
                <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          )}
        </GoalEditModal>
      )}
    </div>
  );
};

export default GoalsPage;