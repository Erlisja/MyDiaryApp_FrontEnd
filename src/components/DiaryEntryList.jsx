import React from 'react'
import DiaryEntryCard from './DiaryEntryCard'


const DiaryEntryList = ({ entries,onUpdate,onDelete  }) => {
  if (!entries) {
      return <p>No diary entries found.</p>; // Show message if no entries
  }

  return (
      <div className="diary-entry-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {entries.map((entry) => (
              <DiaryEntryCard key={entry._id} entry={entry} onDelete={onDelete}  onUpdate={onUpdate} /> // Pass each entry to DiaryCard
          ))}
      </div>
  );
};

export default DiaryEntryList

