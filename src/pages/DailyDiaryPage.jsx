import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import diaryEntryService from "../utilities/diaryEntryService";
import NavBar from "../components/NavBar";
import Calendar from "react-calendar"; // Import the Calendar component
import "react-calendar/dist/Calendar.css"; // Import the Calendar CSS - default calendar styling
import { VectorPen, BookmarkHeart} from "react-bootstrap-icons";
import Alert from "../components/Alert"; // Import the Alert component

// Define the DailyDiaryPage component
const DailyDiaryPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    mood: "",
    isFavorite: false,
    createdAt: new Date().toISOString().split("T")[0],
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: "", type: "" }), 3000); // Clear the alert after 3 seconds
  }


  // Define the handleChange function to update the form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Define the handleSubmit function to add a new diary entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      if (!token) {
        console.error("No token found");
        showAlert("No token found. Please log in.", "error");
        return;
      }

      const decodedToken = jwtDecode(token); // Decode the token to get userId
      const userId = decodedToken._id; // Get the userId from the decoded token
      const diaryEntryData = {
        ...formData,
        userId,
      };

      const response = await diaryEntryService.addDiaryEntry(diaryEntryData);
      console.log("Diary Entry Added:", response);
      showAlert("Diary entry added successfully!", "success");
      setFormData({
        title: "",
        content: "",
        tags: "",
        mood: "happy",
        isFavorite: false,
        createdAt: new Date().toISOString().split("T")[0], // Reset form data
      });
    } catch (error) {
      console.error("Error adding diary entry:", error);
     showAlert("Failed to add diary entry. Please try again.", "error");
    }
  };

  return (
    <>
      <div className="entry-page-container">
      <Alert
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ message: "", type: "" })}
      />
        <NavBar layout="vertical" />
        <div className="entry-page">
          <h1 className="title">Add New Diary Entry</h1>

          {/* Form Layout */}
          <form className="entry-container" onSubmit={handleSubmit}>
      
            {/* Calendar Component */}
            <div className="calendar-div">
              {formData.createdAt && (
                <Calendar
                  value={new Date(formData.createdAt)} // Ensure this is in local time
                  onChange={(date) => {
                    console.log("Selected date:", date); // Pass raw date
                    setFormData((prevData) => ({
                      ...prevData,
                      createdAt: date,
                    }));
                  }}
                  
                />
              )}
            </div>

            {/* Mood and Tags */}
            <div className="entry-header">
              <div>
                <label>Mood:</label>
                <select
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                >
                  <option value="">Select Mood</option>
                  <option value="happy">😁 Happy</option>
                  <option value="love">😍 Loved</option>
                  <option value="excited">😃 Excited</option>
                  <option value="sad">😔 Sad</option>
                  <option value="angry">😡 Angry</option>
                  <option value="surprised">😲 Surprised</option>
                  <option value="neutral">😐 Neutral</option>
                </select>
              </div>
              <div>
                <label> <BookmarkHeart/> Tags:</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Comma-separated tags"
                />
              </div>
            </div>

            {/* Title Input */}
            <div className="title-div">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Content Textarea */}
            <div className="content-box">
              <label><VectorPen/> Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>
            {/* </div> */}

            {/* Submit Button */}
            <div className="submit-btn">
              <button type="submit">Add Entry</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DailyDiaryPage;
