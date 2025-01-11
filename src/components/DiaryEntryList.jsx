import React from 'react';
import Card from './DiaryEntryCard';

const List = ({ entries, onDelete }) => {
  return (
    <div className="list">
      {entries.map((entry) => (
        <Card key={entry._id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default List;
