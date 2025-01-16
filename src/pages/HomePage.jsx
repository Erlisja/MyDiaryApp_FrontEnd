import React, { useState, useEffect } from "react";
import { getUser } from "../utilities/users-services";
import { getLastDiaryEntries, getDiaryEntryDates,getDiaryEntryCount } from "../utilities/diaryEntryService";
import { getGoalCount } from "../utilities/goalsEntryService";
import diaryEntryService from "../utilities/diaryEntryService";
import { jwtDecode } from "jwt-decode";
import NavBar from "../components/NavBar";
import { Link } from "react-router";
import "react-calendar/dist/Calendar.css";
import CalendarComponent from "../components/CalendarComponent";




function HomePage() {
  const [user, setUser] = useState(getUser());
  const [recentEntries, setRecentEntries] = useState([]);
  const [entriesCount, setEntriesCount] = useState(0);
  const [entryDates,setEntryDates] = useState([]);
  const [goalsCount, setGoalsCount] = useState(0);
  



  const [message, setMessage] = useState({
    title: "Thoughts for the day",
    content: "",
    tags: "thoughts",
    mood: "happy",
    isFavorite: false,
    createdAt: new Date().toISOString().split("T")[0], // Default to today
  });



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
        ...message,
        userId,
      };

      const response = await diaryEntryService.addDiaryEntry(diaryEntryData);
      console.log("Diary Entry Added:", response);
      alert("Diary entry added successfully!");
      setMessage({
        title: "Thoughts for the day",
        content: "",
        tags: "thoughts",
        mood: "happy",
        isFavorite: false,
        createdAt: new Date().toISOString().split("T")[0], // Reset form data
      });
    } catch (error) {
      console.error("Error adding diary entry:", error);
      alert("Error adding diary entry!");
    }
  };

// useEffect to fetch goals count
useEffect(()=>{
  setUser(getUser());
  async function getTotalNrGoals(){
    const count = await getGoalCount();
    console.log(count);
    setGoalsCount(count.count);
  }
  getTotalNrGoals();
},[]);




  useEffect(()=>{
    setUser(getUser());
    // Fetch diary entry dates
    async function fetchDiaryEntryDates() {
      const dates = await getDiaryEntryDates(); // Fetch the dates where entries were made
      setEntryDates(dates); // Set the fetched dates
    }
    fetchDiaryEntryDates();
  }, []);



// useEffect to fetch recent entries and entries count
  useEffect(() => {
    setUser(getUser());
    // Simulate fetching recent entries from the database
    async function fetchRecentEntries() {
      const entries = await getLastDiaryEntries();
      setRecentEntries(entries);
    }
    fetchRecentEntries();
  }, []);


  useEffect(() => {
    setUser(getUser());
    // Simulate fetching entries count from the database
    async function fetchEntriesCount() {
      const count = await getDiaryEntryCount();
      setEntriesCount(count.count);
    }
    fetchEntriesCount();

  }, []);



  return (
    <>
      <div className="home-container1">
        <NavBar layout={"horizontal"} />
        <div className="home-container">
          {user ? (
            <>
              <h1 className="title">Welcome to your diary, {user.username}</h1>
              <h2 className="subtitle-txt">
                What are you thinking about today?
              </h2>

              <div className="grid-container">
                {/* Daily Quote */}
                <div className="grid-item quote-section">
                  <h2>Today's Inspiration:</h2>
                  <p>
                    "The best way to predict the future is to create it." -
                    Peter Drucker
                  </p>
                </div>

                {/* Writing Prompt */}
                <div className="grid-item writing-prompt">
                  <h2>Need some inspiration?</h2>
                  <p>What’s one thing that made you smile today?</p>

                  <form className="message-form" onSubmit={handleSubmit}>
                    <div className="content-box">
                      <label
                        style={{ fontWeight: "bolder", fontFamily: "serif" }}
                      >
                        What's on your mind?
                      </label>
                      <textarea
                        name="content"
                        value={message.content}
                        onChange={(e) =>
                          setMessage((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                      ></textarea>
                    </div>
                    <div className="submit-btn">
                      <button type="submit">Save</button>
                    </div>
                  </form>
                </div>

                {/* Recent Entries */}
                <div className="grid-item recent-entries">
                  <h2>Your Recent Entries:</h2>
                  {recentEntries? (
                    <ul>
                      {recentEntries.map((entry, index) => (
                        <Link
                          key={index}
                          to={`/entry/${entry._id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <li
                            className="entry-link"
                            style={{
                              listStyleType: "none",
                            }}
                            key={index}
                          >
                            {entry.title}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <p>No recent entries. Start writing today!</p>
                  )}
                </div>

                {/* Mood Tracker */}
                <div className="grid-item mood-tracker">
                  <h2>How are you feeling today?</h2>
                  <div className="mood-buttons">
                    <button>😊 Happy</button>
                    <button>😢 Sad</button>
                    <button>😡 Stressed</button>
                    <button>😌 Relaxed</button>
                  </div>
                </div>

                {/* Achievements */}
                <div className="grid-item achievements">
                  <h2>Your Achievements:</h2>
                  <p>You've written  {entriesCount}  diary entries! 🌺</p>
                  <p>You have set {goalsCount} goals! 🎯</p>
                </div>

                {/* Calendar View */}
                <div className="grid-item calendar-widget">
                  <h2>Your Journal Calendar:</h2>
                  {/* Placeholder for Calendar Component */}
                  <CalendarComponent   entryDates={entryDates} />
                </div>
              </div>
            </>
          ) : (
            <h1>Welcome! Please log in to access your diary.</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
