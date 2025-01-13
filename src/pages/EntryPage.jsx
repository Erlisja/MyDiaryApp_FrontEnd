import { useParams } from "react-router";
import { getDiaryEntry } from "../utilities/diaryEntryService";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

function EntryPage() {
  const { id } = useParams(); // get the id from the URL
  const [entry, setEntry] = useState({
    title: "",
    mood: "",
    tags: [],
    content: "",
    createdAt:new Date(),
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
      <NavBar layout={"vertical"} />
     
        <div className="entry-page">
          <h1 className="title">Diary Page</h1>
          <h1 className="title-div">{entry.title}</h1>
          <p className="tags-div">
            <strong>Mood:</strong> {entry.mood}
          </p>
          <p className="tags-divs">
            <strong>Tags:</strong>
            {entry.tags?.length ? entry.tags.join(", ") : "No tags"}
          </p>
          <p className="content-div">
            <strong>Content:</strong> {entry.content}
          </p>
          <p className="calendar-div">
            <small>
              Written on: {new Date(entry.createdAt).toLocaleDateString()}
            </small>
          </p>
        </div>
      
    </>
  );
}

export default EntryPage;
