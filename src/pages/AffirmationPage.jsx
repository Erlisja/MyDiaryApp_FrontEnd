import { useState } from "react";
import { fetchAffirmation } from "../utilities/affirmations-services";

const moods = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "🥰", label: "Loved", value: "loved" },
  { emoji: "😢", label: "Sad", value: "sad" },
  { emoji: "😡", label: "Angry", value: "angry" },
  { emoji: "😌", label: "Relaxed", value: "relaxed" },
  { emoji: "😔", label: "Lonely", value: "lonely" },
  { emoji: "😰", label: "Anxious", value: "anxious" },

];

const AffirmationPage = () => {
  const [affirmation, setAffirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState("neutral");

  const getAffirmation = async () => {
    setLoading(true);
    try {
      const newAffirmation = await fetchAffirmation(selectedMood);
      setAffirmation(newAffirmation);
    } catch (error) {
      alert("Failed to fetch affirmation. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Personalized Affirmations</h1>
      <p>Select your mood:</p>
      <div style={{ marginBottom: "20px" }}>
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            style={{
              margin: "5px",
              padding: "10px",
              fontSize: "1.5em",
              cursor: "pointer",
              border: selectedMood === mood.value ? "2px solid #4caf50" : "1px solid #ccc",
              backgroundColor: selectedMood === mood.value ? "#e8f5e9" : "white",
            }}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      <button
        onClick={getAffirmation}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
        }}
      >
        Get Affirmation
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p style={{ marginTop: "20px", fontSize: "1.5em", fontStyle: "italic" }}>
          {affirmation}
        </p>
      )}
    </div>
  );
};

export default AffirmationPage;
