import { useEffect, useState } from "react";
import {
  getAllDiaryEntries,
  deleteDiaryEntry,
  updateDiaryEntry,
} from "../utilities/diaryEntryService";
import DiaryEntryList from "../components/DiaryEntryList";

const TimelinePage = () => {
  const [diaryEntries, setDiaryEntries] = useState([]); //state to store diary entries
  const [error, setError] = useState(null); //state to handle errors

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const entries = await getAllDiaryEntries();
        console.log("Diary Entries:", entries);
        setDiaryEntries(entries); // set the diary entries in the state variable to display them
      } catch (error) {
        console.log("Error getting diary entries:", error);
        setError(error.message);
      }
    };
    fetchDiaryEntries();
  }, []);

  const deleteEntry = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteDiaryEntry(id); // call deleteDiaryEntry function to delete the entry from API
        setDiaryEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== id)
        ); // remove the entry from the state variable
      } catch (error) {
        console.error("Error deleting diary entry:", error);
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  const updateEntry = async (id, updatedData) => {
    try {
      const updatedEntry = await updateDiaryEntry(id, updatedData); // call updateDiaryEntry function to update the entry in the API
      setDiaryEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === id ? updatedEntry : entry
        )
      ); // update the entry in the state variable
    } catch (error) {
      console.error("Error updating diary entry:", error);
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }
  

  return (
    <div className="timeline">
      <h1>Timeline Page</h1>
      {error && <p className="error">{error}</p>}
      <DiaryEntryList
        entries={diaryEntries}
        onDelete={deleteEntry}
        onUpdate={updateEntry}
      />
    </div>
  );
};

export default TimelinePage;
