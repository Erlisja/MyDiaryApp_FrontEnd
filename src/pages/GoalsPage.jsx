import React, { useState, useEffect } from "react";
import goalsEntryService from "../utilities/goalsEntryService"; // Ensure this import is used if needed
import GoalForm from "../components/GoalForm";
import GoalFilters from "../components/GoalsFilter";
import GoalList from "../components/GoalList";
import GoalEditModal from "../components/GoalEditModal";
import {
  addNewGoal,
  getAllGoals,
  deleteGoalEntry,
  updateGoalEntry,
} from "../utilities/goalsEntryService"; // Ensure the edit function is imported
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Function to show the alert
  const showAlert = (message, type) => {
    setAlert({ message, type, show: true });
    setTimeout(() => setAlert({ message: "", type: "", show: false }), 3000); // Auto-hide after 3 seconds
  };

  // Fetch goals when the component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  // Function to fetch all goals
  const fetchGoals = async () => {
    try {
      const response = await getAllGoals(); // Call the getAllGoals function to fetch all goals
      setGoals(response); // Set the goals in the state variable
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  // Add a new goal
  const handleAddGoal = async (goal) => {
    try {
      await addNewGoal(goal);
      fetchGoals(); //Refetch the goals after adding a new goal
      showAlert("Goal added successfully!", "success"); // Show the success alert
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    try {
      await deleteGoalEntry(id); // Call the deleteGoalEntry function to delete the goal
      showAlert("Goal deleted successfully!", "success"); // Show the success alert
      fetchGoals(); // Refetch the goals after deleting a goal
    } catch (error) {
      console.error("Error deleting goal:", error);
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
      if (updatedGoal.status === "completed") {
        // If the goal status is completed, show the alert message and after 3 seconds show the success alert
        showAlert("Congratulations on completing your goal ! 🎉", "info")
        showAlert("Goal updated successfully!", "success");
      } else {
        showAlert("Goal updated successfully!", "success"); // Show the success alert
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  // Filter goals based on the selected filter
  const filteredGoals = goals.filter((goal) => {
    switch (filter) {
      case "high":
        return goal.priority === "High";
      case "medium":
        return goal.priority === "Medium";
      case "low":
        return goal.priority === "Low";
      case "completed":
        return goal.status === "completed";
      case "incomplete":
        return goal.status !== "completed";
      default:
        return true;
    }
  });

  return (
    <>
      <NavBar layout="horizontal" />
      <Alert
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={() => setAlert({ message: "", type: "", show: false })}
      />
      <div className="goals-page-container">
        <h1 className="page-title">Goals Page</h1>

        {/* Form and Filters Container */}
        <div className="form-and-filters-container">
          {/* Goal Form */}
          <div className="goal-form-section">
            <GoalForm onSubmit={handleAddGoal} />
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
                // if the goal status is completed, show the alert message
                if (updatedGoal.status === "completed") {
                  showAlert(
                    "Congratulations on completing your goal! 🎉",
                    "info"
                  );
                } 
              }}
            >
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={currentGoal.title}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  defaultValue={currentGoal.description}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Priority:</label>
                <select
                  name="priority"
                  defaultValue={currentGoal.priority}
                  className="form-control"
                >
                  <option value="">Select Priority</option>
                  <option value="High">🔥 High</option>
                  <option value="Medium">⚖️ Medium</option>
                  <option value="Low">🌱 Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Deadline:</label>
                <input
                  type="date"
                  name="deadline"
                  {...(currentGoal.deadline && {
                    // use the local date format
                    defaultValue: new Date(
                      currentGoal.deadline
                    ).toLocaleDateString("en-CA"),
                  })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  defaultValue={currentGoal.status}
                  className="form-control"
                >
                  <option value="completed">✅ Completed</option>
                  <option value="incomplete">⏳ In Progress</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  Update Goal
                </button>
                <button
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </GoalEditModal>
      </div>
    </>
  );
};

export default GoalsPage;
