import React, { useState, useEffect } from "react";

const Goals = () => {
    const [currentGoal, setCurrentGoal] = useState(""); // from DB
    const [newGoal, setNewGoal] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/api/returnGoal?userId=john_doe") // replace with actual user ID logic
        .then((res) => res.json())
        .then((data) => setCurrentGoal(data.weeklyGoal ?? ""))
        .catch((err) => console.error("Error fetching goal:", err));
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
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
    };

    return (
    <div className="log-page">
      <h2>Set Your Goal</h2>
      <div>Current goal: {currentGoal}</div>
      <form onSubmit={handleSubmit}>
        <label>
          Goal:
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          >
            </input>
        </label>
        <button type="submit">Set Goal</button>
      </form>
    </div>
    )
};

export default Goals;