import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css"
import Header from "./navbar";

const Goals = () => {
    const [currentGoal, setCurrentGoal] = useState("");
    const [newGoal, setNewGoal] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/api/returnUser?userId=john_doe") // replace with actual user ID logic
        .then((res) => res.json())
        .then((data) => setCurrentGoal(data.dailyGoal ?? ""))
        .catch((err) => console.error("Error fetching goal:", err));
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newGoal.trim() === "") {
            setMessage("Goal cannot be empty");
            return;
        }
        else if (newGoal === currentGoal) {
            setMessage("New goal must be different from current goal");
            return;
        }
        else if (newGoal < 0) {
            setMessage("Goal must be a positive number");
            return;
        }
        else {
          fetch("http://localhost:4000/api/setGoal", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: "john_doe",  goal: newGoal }), // replace with actual user ID logic
          })
          .then((res) => res.json())
          .then((data) => {
              console.log("Goal set successfully:", data);
              setCurrentGoal(newGoal);
              setNewGoal("");
          })
          .catch((err) => console.error("Error setting goal:", err));
        }
    };

    return (
    <div className="log-page">
      <Header />
      <br />
      <br />
      <h2>Set Your Goal</h2>
      <div>Current goal: {currentGoal}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Goal:
          <input
            type="number"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          >
            </input>
        </label>
        <button type="submit">Set Goal</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    )
};

export default Goals;