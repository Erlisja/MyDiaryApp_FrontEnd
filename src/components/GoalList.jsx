import React from "react";
import { Trash3, PencilSquare } from "react-bootstrap-icons";

const GoalList = ({ goals, onEdit, onDelete }) => {
  return (
    <div className="goal-list">
      <h3 className="page-title">Your Goals</h3>
      {goals ? (
        goals.map((goal) => (
          <div key={goal._id} className="goal-item">
            <h4>{goal.title}</h4>
            <p>{goal.description}</p>
            <p>
              <strong>Deadline: </strong>
              {new Date(goal.deadline).toLocaleDateString()}
            </p>
            <p>
              <strong>Priority: </strong>
              {goal.priority === "High"
                ? "🔥 High"
                : goal.priority === "Medium"
                ? "⚖️ Medium"
                : "🌱 Low"}
            </p>
            <p>
              <strong>Status: </strong>{" "}
              {goal.status === "completed" ? "✅ Completed" : "⏳ In Progress"}
            </p>
            <button className="btn btn-primary" onClick={() => onEdit(goal)}>
              <PencilSquare  />
            </button>
            <button
              className=" btn btn-secondary"
              onClick={() => onDelete(goal._id)}
            >
              <Trash3 />
            </button>
          </div>
        ))
      ) : (
        <p>No goals found.</p>
      )}
    </div>
  );
};

export default GoalList;
