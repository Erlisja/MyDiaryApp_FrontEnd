import { useParams } from "react-router";
import { getDiaryEntry } from "../utilities/diaryEntryService";
import { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import the Calendar component
import "react-calendar/dist/Calendar.css"; // Import the Calendar CSS - default calendar styling
import NavBar from "../components/NavBar";

function EntryPage() {
  const { id } = useParams(); // get the id from the URL
  const [entry, setEntry] = useState({
    title: "",
    mood: "",
    tags: [],
    content: "",
    createdAt: new Date(),
  }); // set the entry state - this is the default state

  useEffect(() => {
    async function fetchEntry() {
      try {
        const entry = await getDiaryEntry(id);
        console.log(entry);
        setEntry(entry);
      } catch (error) {
        console.log("Error getting entry:", error.message);
      }
    }
    fetchEntry(); // call the fetchEntry function when the component mounts
  }, [id]); // add id as a dependency to the useEffect hook to re-run the effect when the id changes

  if (!entry) return <p>Loading...</p>;

  return (
    <>
    <div className="entry-page-container">

      <NavBar layout={"vertical"} />
      <div className="entry-page">
        <h1 className="title">Diary Page</h1>
      
        {/* Calendar View */}
        <div className="calendar-div">
          <Calendar
            value={new Date(entry.createdAt)} // Highlight the diary entry date
            tileClassName={({ date, view }) =>
              date.toISOString().split("T")[0] ===
              new Date(entry.createdAt).toISOString().split("T")[0]
                ? "highlight-date"
                : ""
            }
          />
       
        {/* Diary Entry Details */}
        <div className="entry-header">
          <div className="tags-div">
            <p>
              <strong>Mood:</strong> {entry.mood}{" "}
            </p>
            <p>
              <strong>Tags:</strong>
              {entry.tags?.length ? entry.tags.join(", ") : "No tags"}
            </p>
          </div>
          <h2 id="title-div">{entry.title}</h2>
        </div>
        </div>
        <div className="content-box">
          <p className="content-div">
            <strong>Content:</strong> {entry.content}
          </p>
        </div>
        <p className="calendar-div">
          <small>
            Written on: {new Date(entry.createdAt).toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
    </>
  );
}

export default EntryPage;
