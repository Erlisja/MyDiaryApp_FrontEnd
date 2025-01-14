import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import diaryEntryService from "../utilities/diaryEntryService";
import NavBar from "../components/NavBar";
import Calendar from "react-calendar"; // Import the Calendar component
import "react-calendar/dist/Calendar.css"; // Import the Calendar CSS - default calendar styling

// Define the DailyDiaryPage component
const DailyDiaryPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    mood: "happy",
    isFavorite: false,
    createdAt: new Date().toISOString().split("T")[0], // Default to today
  });

  // Define the handleChange function to update the form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define the handleSubmit function to add a new diary entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      if (!token) {
        console.error("No token found");
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
      alert("Diary entry added successfully!");
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
      alert("Error adding diary entry!");
    }
  };




  return (
    <>
      <div className="entry-page-container">
        <NavBar layout="vertical" />
        <div className="entry-page">
          <h1 className="title">Add New Diary Entry</h1>

          {/* Form Layout */}
          <form className="entry-container" onSubmit={handleSubmit}>
            {/* <div className="form-grid"> */}
              {/* Calendar Component */}

              <div className="calendar-div">
                <Calendar 
                  value={new Date(formData.createdAt)}
                  onChange={(date) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      createdAt: date.toISOString().split("T")[0],
                    }))
                  
                  }
                />
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
                    <option value="happy">Happy</option>
                    <option value="sad">Sad</option>
                    <option value="angry">Angry</option>
                    <option value="surprised">Surprised</option>
                    <option value="neutral">Neutral</option>
                  </select>
                </div>
                <div>
                  <label>Tags:</label>
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
                <label>Content:</label>
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