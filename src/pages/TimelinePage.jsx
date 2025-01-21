import { useEffect, useState } from "react";
import {
  getAllDiaryEntries,
  deleteDiaryEntry,
  updateDiaryEntry,
} from "../utilities/diaryEntryService";
import DiaryEntryList from "../components/DiaryEntryList";
import NavBar from "../components/NavBar";
import Alert from "../components/Alert";

const TimelinePage = () => {
  const [diaryEntries, setDiaryEntries] = useState([]); //state to store diary entries
  const [error, setError] = useState(null); //state to handle errors
  const [successMessage, setSuccessMessage] = useState(null); //state to handle success messages
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000); // Clear the alert after 3 seconds
  }

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
        showAlert("Diary entry deleted successfully!", "success");
        setSuccessMessage("Diary entry deleted successfully!", "success");
        setDiaryEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== id)
        ); // remove the entry from the state variable
       
      } catch (error) {
        console.error("Error deleting diary entry:", error);
        showAlert("Failed to delete diary entry. Please try again.", "error");
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
        prevEntries.map((entry) => (entry._id === id ? updatedEntry : entry))
      ); // update the entry in the state variable
      setSuccessMessage("Diary entry updated successfully!");
      showAlert("Diary entry updated successfully!", "success");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Error updating diary entry:", error)
      showAlert("Failed to update diary entry. Please try again.", "error");
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <>
      <NavBar  />
      <div className="timeline-page-container">
      {alert.message && (
  <Alert
    message={alert.message}
    type={alert.type}
    onClose={() => setAlert({ message: "", type: "" })}
  />
)}

        <h1 className="title">Timeline Page</h1>
        <div className="timeline">
          {error && <p className="error">{error}</p>}
          
          <DiaryEntryList
            className="diary-entry-list"
            entries={diaryEntries}
            onDelete={deleteEntry}
            onUpdate={updateEntry}
          />
        
        </div>
      </div>
    </>
  );
};

export default TimelinePage;
