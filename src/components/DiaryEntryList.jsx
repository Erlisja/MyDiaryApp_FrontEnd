import React from 'react'
import DiaryEntryCard from './DiaryEntryCard'
import { Link } from "react-router";


const DiaryEntryList = ({ entries,onUpdate,onDelete  }) => {
  if (!entries) {
      return <p>No diary entries found.</p>; // Show message if no entries
  }

  return (
      <div className="diary-entry-list">
          {entries.map((entry) => (
            <div key={entry._id} className="diary-entry-card">
              <DiaryEntryCard key={entry._id} entry={entry} onDelete={onDelete}  onUpdate={onUpdate} />
            </div>
          ))}
      </div>
  );
};

export default DiaryEntryList

