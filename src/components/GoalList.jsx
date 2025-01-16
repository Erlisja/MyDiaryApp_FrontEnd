import React from 'react';

const GoalList = ({ goals, onEdit, onDelete }) => {
  return (
    <div className="goal-list">
      <h3 className='title'>Your Goals</h3>
      {goals.length > 0 ? (
        goals.map((goal) => (
          <div key={goal._id} className="goal-item">
            <h4>{goal.title}</h4>
            <p>{goal.description}</p>
            <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
            <p>
              Priority:{' '}
              {goal.priority === 'High'
                ? '🔥 High'
                : goal.priority === 'Medium'
                ? '⚖️ Medium'
                : '🌱 Low'}
            </p>
            <p>Status: {goal.status === 'completed' ? '✅ Completed' : '⏳ In Progress'}</p>
            <button onClick={() => onEdit(goal)}>Edit</button>
            <button onClick={() => onDelete(goal._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No goals found.</p>
      )}
    </div>
  );
};

export default GoalList;
