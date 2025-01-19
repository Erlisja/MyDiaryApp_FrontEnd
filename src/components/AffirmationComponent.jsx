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

const AffirmationComponent = () => {
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
    <div style={{ textAlign: "center" }}>
      <h2>How are you feeling today?</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {moods.map((mood) => (
          <div key={mood.value} style={{ textAlign: "center" }}>
            <button
              onClick={() => setSelectedMood(mood.value)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2em",
                color: selectedMood === mood.value ? "#BFA98E" : "#000",
                transition: "color 0.3s ease",
              }}
            >
              {mood.emoji}
            </button>
            <p
              style={{
                marginTop: "1px",
                fontSize: "1em",
                color: selectedMood === mood.value ? "#BFA98E" : "#666",
                fontWeight: selectedMood === mood.value ? "bold" : "normal",
                transition: "color 0.3s ease",
                fontFamily: "serif",
                fontStyle: selectedMood === mood.value ? "italic" : "normal",
              }}
            >
              {mood.label}
            </p>
          </div>
        ))}
      </div>
      <div className="submit-btn">
      <button
        onClick={getAffirmation}
        className="btn"
        // onMouseOver={(e) => (e.target.style.backgroundColor = " #D9CCC5", e.target.style.color = "#000", e.target.style.fontWeight = "bold", e.target.style.border = "1px solid #BFA98E")}
        // onMouseOut={(e) => (e.target.style.border = "1px solid #BFA98E")}
      >
        Get Affirmation
      </button>
      </div>
      {loading ? (
        <p style={{ marginTop: "20px", fontSize: "1.2em", color: "#666" }}>Loading...</p>
      ) : (
        <p
          style={{
            border: "1px solid #BFA98E",
            marginTop: "20px",
            fontSize: "1em",
            color: "#666",
            fontFamily: "serif",
            fontStyle: "italic",
          }}
        >
          {affirmation}
        </p>
      )}
    </div>
  );

};

export default AffirmationComponent;