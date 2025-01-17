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
  },[]);

  // Function to fetch all goals
  const fetchGoals = async () => {
    try {
      const response = await getAllGoals(); // Call the getAllGoals function to fetch all goals
      setGoals(response); // Set the goals in the state variable
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Add a new goal
  const handleAddGoal = async (goal) => {
    try {
      await addNewGoal(goal);
      fetchGoals();  //Refetch the goals after adding a new goal
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoalEntry(id); // Call the deleteGoalEntry function to delete the goal
      fetchGoals();             // Refetch the goals after deleting a goal
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
  const handleGoalUpdate = async (id, updatedGoal) => {
    try {
      await updateGoalEntry(id, updatedGoal); // Update the goal in the backend
    await fetchGoals(); // Wait for goals to be refetched
    setIsModalOpen(false); // Close the modal only after fetch completes
    setCurrentGoal(null); // Clear the current goal state
    }
    catch (error) {
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
    <>
    <NavBar layout="horizontal" />
    <div className="goals-page-container">
     
      <h1 className="page-title">Goals Page</h1>
  
      {/* Form and Filters Container */}
      <div className="form-and-filters-container">
        {/* Goal Form */}
        <div className="goal-form-section">
          <GoalForm 
            onSubmit={handleAddGoal}
          />
        </div>
  
        {/* Goal Filters */}
        <div className="goal-filters-section">
          <GoalFilters filter={filter} setFilter={setFilter} />
        </div>
      </div>
  
      {/* Goal List Section */}
      <div className="goal-list-section">
        <GoalList 
          goals={filteredGoals} 
          onEdit={handleEditClick}
          onDelete={handleDeleteGoal}
        />
      </div>
  
      {/* Edit Modal */}
      <GoalEditModal show={isModalOpen} onClose={handleCloseModal}>
        {currentGoal && (
          <form
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
              handleGoalUpdate(currentGoal._id, updatedGoal);
              fetchGoals();
              if (e.target.status.value === 'completed') {
                alert('Congratulations on completing your goal!');
              }
              handleCloseModal();
            }}
          >
            <div className="form-group">
              <label>Title:</label>
              <input type="text" name="title" defaultValue={currentGoal.title} className="form-control" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" defaultValue={currentGoal.description} className="form-control" />
            </div>
            <div className="form-group">
              <label>Priority:</label>
              <select name="priority" defaultValue={currentGoal.priority} className="form-control">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label>Deadline:</label>
              <input type="date" name="deadline" defaultValue={currentGoal.deadline} className="form-control" />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select name="status" defaultValue={currentGoal.status} className="form-control">
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type='submit' className="btn btn-primary">Update Goal</button>
              <button onClick={handleCloseModal} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        )}
      </GoalEditModal>
    </div>
    </> 
  );

};

export default GoalsPage;