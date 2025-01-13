import React, { useState, useEffect } from "react";
import { getUser } from "../utilities/users-services";
import { getLastDiaryEntries } from "../utilities/diaryEntryService";
import NavBar from "../components/NavBar";
import { Link } from "react-router";

function HomePage() {
  const [user, setUser] = useState(getUser());
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    setUser(getUser());

    // Simulate fetching recent entries from the database
    async function fetchRecentEntries() {
      const entries = await getLastDiaryEntries();
      setRecentEntries(entries);
    }
    fetchRecentEntries();
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
                </div>

                {/* Recent Entries */}
                <div className="grid-item recent-entries">
                  <h2>Your Recent Entries:</h2>
                  {recentEntries.length > 0 ? (
                    <ul>
                      {recentEntries.map((entry, index) => (
                        <Link key={index}
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
                  <p>You've written 50 diary entries!</p>
                  <p>Longest streak: 7 days</p>
                </div>

                {/* Calendar View */}
                <div className="grid-item calendar-widget">
                  <h2>Your Journal Calendar:</h2>
                  {/* Placeholder for Calendar Component */}
                  <div className="calendar">[Calendar Placeholder]</div>
                </div>

                {/* Music Player */}
                <div className="grid-item music-player">
                  <h2>Relax and Write:</h2>
                  <button>Play Ambient Music</button>
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
