import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '../components/DiaryEntryList';

const TimelinePage = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('/diary-entries', {
        headers: {
          Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with dynamic token
        },
      });
      setDiaryEntries(response.data);
    } catch (error) {
      console.error('Error fetching diary entries:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`/diary-entries/${id}`, {
        headers: {
          Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with dynamic token
        },
      });
      setDiaryEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id));
      alert('Entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="timeline-page">
      <h1>Timeline</h1>
      {diaryEntries.length === 0 ? (
        <p>No entries found. Add your first diary entry!</p>
      ) : (
        <List entries={diaryEntries} onDelete={deleteEntry} />
      )}
    </div>
  );
};

export default TimelinePage;
