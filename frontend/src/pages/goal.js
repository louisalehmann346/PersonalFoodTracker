import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import "../goal.css";
const apiUrl = "http://localhost:4000/";

const Goals = ({username}) => {
    const [currentGoal, setCurrentGoal] = useState(0);
    const [newGoal, setNewGoal] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
      axios.get(`${apiUrl}api/returnUser?userId=${username}`) // replace with actual user ID logic
       .then((response) => {
          setCurrentGoal(response.data.dailyGoal ?? 0);
       })
       .catch((err) => console.error("Error fetching goal:", err));
    }, [username]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newGoal === "") {
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
          try {
            const body = { userId: username, goal: newGoal }; // replace with actual user ID logic
            const response = await axios.post(`${apiUrl}api/setGoal`, body);
            console.log("Server response:", response.data);
          } catch (error) {
            console.error("Error setting goal:", error);
          }
          setCurrentGoal(newGoal);
          setNewGoal("");
          setMessage("Goal updated successfully");
        }
    };

    return (
    <div className="log-page">
      <h2>Set Your Goal</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label>
          Goal:
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value === "" ? "" : Number(e.target.value))}
            >
              </input>
          </label>
          <button type="submit">Set Goal</button>
        </form>
        {message && <p>{message}</p>}
      </div>

    </div>
    )
};

export default Goals;