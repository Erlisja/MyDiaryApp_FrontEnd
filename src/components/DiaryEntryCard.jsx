import React from "react";
import { useState } from "react";

function DiaryEntryCard({ entry, onDelete, onUpdate }) {
  const { title, content, tags, mood, isFavorite, createdAt } = entry;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState(entry);

  const handleEdit = () => {
    setIsEditing(true); // entering the edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(entry._id, updatedEntry); // Call the onUpdate function with the updated entry
    setIsEditing(false); // exiting the edit mode after saving
  };

  const handleCancel = () => {
    setUpdatedEntry(entry); // reset the updated entry to the original entry
    setIsEditing(false); // exiting the edit mode without saving
  };

  return (
    <div
      className="diary-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {isEditing ? (
        <div>
          <h2>Edit Entry</h2>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={updatedEntry.title}
            onChange={handleChange}
          />
          <br />
          <label>Content:</label>
          <textarea
            type="text"
            name="content"
            value={updatedEntry.content}
            onChange={handleChange}
          />
          <br />
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={updatedEntry.tags.join(", ")}
            onChange={(e) =>
              handleChange({
                target: { name: "tags", value: e.target.value.split(", ") },
              })
            }
          />
          <br />
          <label>Favorite:</label>
          <span>{updatedEntry.isFavorite ? "❤️" : "🤍"}</span>
          <input
            type="checkbox"
            name="isFavorite"
            checked={updatedEntry.isFavorite}
            onChange={(e) =>
              setUpdatedEntry((prev) => ({
                ...prev,
                isFavorite: e.target.checked, // Update isFavorite based on the checkbox
              }))
            }
          />
          <br />
          <label>Mood:</label>
          <select name="mood" value={updatedEntry.mood} onChange={handleChange}>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="surprised">Surprised</option>
            <option value="neutral">Neutral</option>
          </select>
          <br />
          <br />
          <button onClick={handleSave}>Save</button>
          &nbsp;
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
          <p style={{ fontSize: "0.8em", color: "#666" }}>
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
          <p style={{ fontSize: "0.8em", color: "#666" }}>Mood: {mood}</p>
          <p style={{ fontSize: "0.8em", color: "#666" }}>
            Tags: {tags.join(", ")}
          </p>
          <p style={{ fontSize: "0.8em", color: "#666" }}>
            Favorite:<span>{isFavorite ? "❤️" : "🤍"}</span>
          </p>
          <button
            onClick={handleEdit}
            style={{
              padding: "8px 12px",
              background: "blue",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(entry._id)}
            style={{
              padding: "8px 12px",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default DiaryEntryCard;
