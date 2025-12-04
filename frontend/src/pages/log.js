import React, { useState, useEffect } from "react";

const Log = () => {
    const [mealOptions, setMealOptions] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState("");
    const [date, setDate] = useState("");
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/returnMeals")
        .then((res) => res.json())
        .then((data) => {
          setMealOptions(data);
        })
        .catch((err) => console.error("Error fetching meals:", err));
    }, []);

    const fetchLogs = () => {
        fetch("http://localhost:4000/api/returnTracker?userId=john_doe") // replace with actual user ID logic
        .then((res) => res.json())
        .then((data) => setLogs(Array.isArray(data) ? data : []))
        .catch((err) => console.error("Error fetching logs:", err));
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = "john_doe"; // Replace with actual user ID logic
        const newTracker = {
          userId: userId, 
          meal: selectedMeal,
          date: date
        };

        console.log("Submitting new tracker:", newTracker);

        try {
          fetch("http://localhost:4000/api/setTracker", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTracker)
          })
          .then((res) => res.json())
          .then(() => {
            fetchLogs();
          })

          setSelectedMeal("");
          setDate("");
        }
        catch (err) {
          console.error("Error logging meal:", err);
        }
    };

    return (
    <div className="log-page">
      <h2>Log a Meal for Yourself</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Meal:
          <select
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option value="">Select a meal</option>
            {mealOptions.map((meal) => (
              <option key={meal._id} value={meal.name}>
                {meal.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Log Meal</button>
      </form>
      <div>
<h2>User Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Date</th>
              <th>Meal</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>
                  {new Date(log.date).toLocaleDateString("en-US", {
                    timeZone: "UTC",
                  })}
                </td>
                <td>{log.meal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    )
};

export default Log;