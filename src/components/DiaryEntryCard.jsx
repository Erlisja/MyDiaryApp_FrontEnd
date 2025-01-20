import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import {PencilSquare, Trash3Fill,ChatRightDotsFill} from "react-bootstrap-icons"; // Import Bootstrap Icons

function DiaryEntryCard({ entry, onDelete, onUpdate }) {
  const { title, content, tags, mood, isFavorite, createdAt } = entry;

  const [isEditing, setIsEditing] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState(entry);

  const handleEdit = (e) => {
    // e.stopPropagation(); // Prevent the click event from bubbling up to the parent element
    setIsEditing(true); // entering the edit mode
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent element
    onDelete(entry._id); // Call the onDelete function with the entry id
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
        <div className="diary-card">
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
            <option value="">Select Mood</option>
            <option value="Happy 😁">😁 Happy</option>
            <option value="Love 😍">😍 Loved</option>
            <option value="Excited 😃">😃 Excited</option>
            <option value="Sad 😔 ">😔 Sad</option>
            <option value="Angry 😡">😡 Angry</option>
            <option value="Surprised 😲">😲 Surprised</option>
            <option value="Neutral 😐">😐 Neutral</option>
          </select>
          <br />
          <br />
          <button onClick={handleSave}>Save</button>
          &nbsp;
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="diary-display">
          <h2>{title}</h2>
      
          <p className="content"> <strong>Content: </strong>{content}</p>
          <p >
            <strong>Created:</strong> {new Date(createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Mood:</strong> {mood}
          </p>
          <p>
            <strong>Tags: </strong> {tags.join(", ")}
          </p>
          <p>
            <strong>Favorite: </strong>
            <span>{isFavorite ? "❤️" : "🤍"}</span>
          </p>       
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            <PencilSquare />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(e);
            }}
          >
            <Trash3Fill />
          </button>
            <Link
              to={`/entry/${entry._id}`}
              className="details-link"      
            >
              <ChatRightDotsFill />
            </Link>
        </div>
      )}
    </div>
  );
}

export default DiaryEntryCard;
