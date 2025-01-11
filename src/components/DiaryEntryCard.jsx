import React from 'react';

const Card = ({ entry, onDelete }) => {
  return (
    <div className="card">
      <h3>{entry.title}</h3>
      <p>{entry.content}</p>
      <p>
        <strong>Mood:</strong> {entry.mood}
      </p>
      <p>
        <strong>Tags:</strong> {entry.tags.join(', ')}
      </p>
      <p>
        <strong>Date:</strong> {new Date(entry.createdAt).toLocaleDateString()}
      </p>
      <div className="card-actions">
        <button onClick={() => onDelete(entry._id)}>Delete</button>
        {/* Add an Edit button if needed */}
      </div>
    </div>
  );
};

export default Card;
