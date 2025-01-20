import React, { useState, useEffect } from "react";
import {
  createManifestation,
  createGeneratedManifestation,
  fetchAllManifestations,
  deleteManifestation,
} from "../utilities/manifestations-services";

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
      const { manifestation } = await createGeneratedManifestation(selectedCategory);
      const splitManifestations = manifestation.split("\n").filter(Boolean); // Ensure lines are separated
      setGeneratedManifestations(splitManifestations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveGenerated = async (text) => {
    try {
      const { newManifestation: savedManifestation } = await createManifestation({
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
      const { newManifestation: savedManifestation } = await createManifestation({
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
    <div >
      <h1 >Manifest Your Dreams</h1>

      <div >
        <label>Select Category:</label>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Health">Health</option>
          <option value="Wealth">Wealth</option>
          <option value="Love">Love</option>
          <option value="Happiness">Happiness</option>
          <option value="Success">Success</option>
        </select>
        <button onClick={handleGenerate}>
          Generate Manifestations
        </button>
      </div>

      <div >
        {generatedManifestations.map((manifestation, index) => (
          <div key={index} >
            <p>{manifestation}</p>
            <button
              onClick={() => handleSaveGenerated(manifestation)}
            
            >
              Save
            </button>
          </div>
        ))}
      </div>

      <textarea
        value={newManifestation}
        onChange={(e) => setNewManifestation(e.target.value)}
        placeholder="Write your manifestation"
       
      />
      <button onClick={handleAdd}>
        Add Manifestation
      </button>

      <h2 >Saved Manifestations</h2>
      <ul >
        {manifestations.map((m) => (
          <li key={m._id} >
            <span>{m.text} - {m.category}</span>
            <button onClick={() => handleDelete(m._id)} >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default ManifestationPage;
