import React, { useState, useEffect } from "react";
import {
  createManifestation,
  createGeneratedManifestation,
  fetchAllManifestations,
  deleteManifestation,
} from "../utilities/manifestations-services";
import NavBar from "../components/NavBar";
import {  Trash3Fill } from "react-bootstrap-icons";

const ManifestationPage = () => {
  const [manifestations, setManifestations] = useState([]);
  const [newManifestation, setNewManifestation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [generatedManifestations, setGeneratedManifestations] = useState([]);

  useEffect(() => {
    const loadManifestations = async () => {
      try {
        const data = await fetchAllManifestations();
        setManifestations(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadManifestations();
  }, []);

  const handleGenerate = async () => {
    try {
      if (!selectedCategory) return alert("Select a category to generate a manifestation!");
      const { manifestation } = await createGeneratedManifestation(
        selectedCategory
      );
      const splitManifestations = manifestation.split("\n").filter(Boolean); // Ensure lines are separated
      setGeneratedManifestations(splitManifestations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveGenerated = async (text) => {
    try {
      const { newManifestation: savedManifestation } =
        await createManifestation({
          text,
          category: selectedCategory || "General",
        });
      setManifestations((prev) => [...prev, savedManifestation]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    if (!newManifestation) return alert("Enter a manifestation");
    try {
      const { newManifestation: savedManifestation } =
        await createManifestation({
          text: newManifestation,
          category: selectedCategory || "General",
        });
      setManifestations((prev) => [...prev, savedManifestation]);
      setNewManifestation("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteManifestation(id);
      setManifestations((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar layout={"vertical"} />

      <div className="manifestation-page">
        <h1 className="title">Manifest Your Dreams</h1>
        <div className="manifestation-div">
          {/* Right Section */}
          <div className="right-section">
            <div className="select-category">
              <label>Select Category:</label>
              <select onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Health">Health</option>
                <option value="Wealth">Wealth</option>
                <option value="Love">Love</option>
                <option value="Happiness">Happiness</option>
                <option value="Success">Success</option>
              </select>
              <button onClick={handleGenerate}>Generate Manifestations</button>
            </div>

            {/* Generated Manifestations */}
            {generatedManifestations.length > 0 && (
              <div className="generated-manifestations">
                {generatedManifestations.map((manifestation, index) => (
                  <div key={index}>
                    <p>{manifestation}</p>
                    <button onClick={() => handleSaveGenerated(manifestation)}>
                      Save
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="write-manifestation">
              <h5>
                <em>Write your Manifestations:</em>
              </h5>
              <textarea
                value={newManifestation}
                onChange={(e) => setNewManifestation(e.target.value)}
                placeholder="Write your manifestation"
              />
              <button onClick={handleAdd}>Add Manifestation</button>
            </div>
          </div>

          {/* Left Section */}
          <div className="left-section">
            <h2 className="subtitle">My Manifestations</h2>
            {manifestations.length > 0 ? (
              <ul className="manifestation-list">
                {manifestations.map((m) => (
                  <li key={m._id}>
                    <p className="saved-manifestation">{m.text}</p>
                    <p className="saved-manifestation">
                      <strong>Category:</strong> {m.category}
                    </p>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(m._id)}
                    >
                      <Trash3Fill />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-manifestations">
                Start manifesting! <br />
                Write or generate your first manifestation...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManifestationPage;
