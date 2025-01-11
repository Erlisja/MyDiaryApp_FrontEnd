import React from "react";

function DiaryEntryCard({ entry,onDelete,onUpdate }) {
  const { title, content, tags, mood, isFavorite,createdAt } = entry;

  return (
    <div
      className="diary-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        
      }}
    >
      <h2>{title}</h2>
      <p>{content}</p>
      <p style={{ fontSize: "0.8em", color: "#666" }}>
        Created: {new Date(createdAt).toLocaleDateString()}
      </p>
      <p style={{ fontSize: "0.8em", color: "#666" }}>
        Mood: {mood}
      </p>
      <p style={{ fontSize: "0.8em", color: "#666" }}>
        Tags: {tags.join(", ")}
      </p> 
      <p style={{ fontSize: "0.8em", color: "#666" }}>
        Favorite: {isFavorite ? "❤️" : "🤍"}
      </p>
      <button onClick={() => onUpdate(entry)} style={{ padding: '8px 12px', background: 'blue', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Edit
                </button>
                <button onClick={() => onDelete(entry._id)} style={{ padding: '8px 12px', background: 'red', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                </button>
    </div>
   
  );
}

export default DiaryEntryCard;
